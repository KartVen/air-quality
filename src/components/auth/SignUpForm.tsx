"use client";
import FormInputField, {FormFieldData, InputType} from "@/components/shared/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {
    EMAIL_VALIDATOR,
    FormError, ProcessingError,
    PASSWORD_VALIDATOR,
    USERNAME_VALIDATOR
} from "@/components/shared/form/utils/validators";
import {isAnyFormFieldError, isSameValues} from "@/components/shared/form/utils/helpers";
import authService from "@/utils/api/auth/authService";
import {signIn} from "next-auth/react";
import {BadRequestApiError, ServiceUnavailableApiError} from "@/utils/api/apiError";

interface FormFields {
    username: FormFieldData;
    email: FormFieldData;
    password: FormFieldData;
    password_2: FormFieldData;
}

const defaultFormFieldsValues: FormFields = {
    username: {value: ''},
    email: {value: ''},
    password: {value: ''},
    password_2: {value: ''}
}

const formFieldsInputs: { id: keyof FormFields, type: InputType, [key: string]: string }[] = [
    {
        id: 'username', type: InputType.TEXT,
        label: "Nazwa użytkownika", placeholder: "Twoja nazwa użytkownika",
    },
    {
        id: "email", type: InputType.EMAIL,
        label: "Adres e-email", placeholder: "Twój adres e-mail",
    },
    {
        id: "password", type: InputType.PASSWORD,
        label: "Hasło", placeholder: "Twoje hasło",
    },
    {
        id: "password_2", type: InputType.PASSWORD,
        label: "Powtórz hasło", placeholder: "Twoje hasło",
    }
];

export default function SignUpForm() {
    const [formFields, setFormFields] =
        useState<FormFields>(defaultFormFieldsValues);
    const [processError, setProcessError] = useState<string | null>();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            username: USERNAME_VALIDATOR.validate(formFields.username),
            email: EMAIL_VALIDATOR.validate(formFields.email),
            password: PASSWORD_VALIDATOR.validate(formFields.password),
            password_2: isSameValues(formFields.password.value, formFields.password_2.value)
                ? PASSWORD_VALIDATOR.validate(formFields.password_2)
                : {...formFields.password_2, error: FormError.PASSWORDS_ARE_DIFFERENT},
        } satisfies FormFields;
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        authService.register(
            formFieldsValidated.email.value,
            formFieldsValidated.username.value,
            formFieldsValidated.password.value,
        )
            .then(res => {
                const {accessToken, refreshToken} = res.tokens;
                return signIn('credentials', {
                    accessToken, refreshToken, redirect: true, callbackUrl: '/'
                })
                    .catch(err => {
                        setFormFields(defaultFormFieldsValues);
                        return setProcessError(ProcessingError.POST_REGISTRATION_ERROR);
                    })
            })
            .catch(err => {
                if (err instanceof BadRequestApiError) {
                    const errors: { pointer: string, reason: string }[] = (err as BadRequestApiError).getData().errors;
                    let newFormFields = formFields;
                    errors.forEach(({pointer}) => {
                        switch (pointer) {
                            case 'username':
                                if (!formFields.username.error) newFormFields = {
                                    ...newFormFields,
                                    username: {...formFields.username, error: 'Nazwa użytkownika już istnieje'}
                                };
                                return;
                            case 'email':
                                if (!formFields.email.error) newFormFields = {
                                    ...newFormFields,
                                    email: {...formFields.email, error: 'Adres e-mail już istnieje'}
                                };
                                return;
                            default:
                                return;
                        }
                    })
                    setFormFields(newFormFields);
                    setProcessError(ProcessingError.VALIDATION_ERROR);
                    return;
                }
                if(err instanceof ServiceUnavailableApiError){
                    setProcessError(ProcessingError.SERVICE_UNAVAILABLE)
                    return;
                }
                setProcessError(ProcessingError.REGISTRATION_ERROR);
            });
    };

    const handleOnChange = (field: keyof FormFields, e: ChangeEvent<HTMLInputElement>) => {
        setFormFields(prevFormFields => ({
            ...prevFormFields,
            [field]: {value: e.target.value, error: undefined}
        }));
    };

    const handleOnBlur = (field: keyof FormFields) => {
        switch (field) {
            case 'username':
                if (USERNAME_VALIDATOR.isEmpty(formFields.username))
                    setFormFields(prevState => ({
                        ...prevState,
                        username: {...formFields.username, error: FormError.USERNAME_REQUIRED},
                    }));
                break;
            case 'email':
                setFormFields(prevState => ({
                    ...prevState,
                    email: EMAIL_VALIDATOR.validate(formFields.email),
                }));
                break;
            case 'password':
            case 'password_2':
                if (PASSWORD_VALIDATOR.isEmpty(formFields[field]))
                    setFormFields(prevState => ({
                        ...prevState,
                        [field]: {...formFields[field], error: FormError.PASSWORD_REQUIRED},
                    }));
                break;
        }
    };

    return (
        <div>
            <div className={`w-full${!processError && ' pt-5'}`}>
                {processError && <span className="block text-red-500 pb-5 text-center">{processError}</span>}
            </div>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                {formFieldsInputs.map(field => (
                    <FormInputField
                        key={field.id}
                        id={field.id}
                        type={field.type}
                        label={field.label}
                        placeholder={field.placeholder}
                        fieldData={formFields[field.id]}
                        onChange={e => handleOnChange(field.id, e)}
                        onBlur={() => handleOnBlur(field.id)}
                    />
                ))}
                <div className="flex justify-center items-center pt-6">
                    <button
                        className="w-full p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold"
                        type="submit">Zarejestruj się
                    </button>
                </div>
            </form>
        </div>
    );
}