"use client";
import FormInputField, {FormFieldData, InputType} from "@/components/shared/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {
    EMAIL_VALIDATOR,
    FormError,
    ProcessingError,
    PASSWORD_VALIDATOR
} from "@/components/shared/form/utils/validators";
import {isAnyFormFieldError} from "@/components/shared/form/utils/helpers";
import {signIn} from "next-auth/react";
import authService from "@/utils/api/auth/authService";
import {ServiceUnavailableApiError} from "@/utils/api/apiError";

interface FormFields {
    email: FormFieldData;
    password: FormFieldData;
}

const defaultFormFieldsState: FormFields = {
    email: {value: ''},
    password: {value: ''}
};

const formFieldsInputs: { id: keyof FormFields, type: InputType, [key: string]: string }[] = [
    {
        id: "email", type: InputType.EMAIL,
        label: "Adres e-email", placeholder: "Twój adres e-mail",
    },
    {
        id: "password", type: InputType.PASSWORD,
        label: "Hasło", placeholder: "Twoje hasło",
    },
];

export default function SignInForm() {
    const [formFields, setFormFields] =
        useState<FormFields>(defaultFormFieldsState);
    const [processError, setProcessError] = useState<string | null>();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            email: EMAIL_VALIDATOR.validate(formFields.email),
            password: PASSWORD_VALIDATOR.validate(formFields.password),
        } satisfies FormFields;
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        authService.login(
            formFieldsValidated.email.value,
            formFieldsValidated.password.value,
        )
            .then(res => {
                const {accessToken, refreshToken} = res;
                return signIn('credentials', {
                    accessToken,
                    refreshToken,
                    redirect: true,
                    callbackUrl: '/'
                })
                    .catch(err => {
                        console.debug('signInErr', err);
                        setFormFields(defaultFormFieldsState);
                        return setProcessError(ProcessingError.POST_LOGIN_ERROR);
                    })
            })
            .catch(err => {
                if(err instanceof ServiceUnavailableApiError){
                    setProcessError(ProcessingError.SERVICE_UNAVAILABLE)
                    return;
                }
                setProcessError(ProcessingError.BAD_CREDENTIALS)
            });
    };

    const handleOnChange = (field: keyof FormFields, e: ChangeEvent<HTMLInputElement>) => {
        setFormFields(prevState => ({
            ...prevState,
            [field]: {value: e.target.value, error: undefined}
        }));
    };

    const handleOnBlur = (field: keyof FormFields) => {
        switch (field) {
            case 'email':
                if (EMAIL_VALIDATOR.isEmpty(formFields.email))
                    setFormFields(prevState => ({
                        ...prevState,
                        email: {...formFields.email, error: FormError.EMAIL_REQUIRED},
                    }));
                break;
            case 'password':
                if (PASSWORD_VALIDATOR.isEmpty(formFields.password))
                    setFormFields(prevState => ({
                        ...prevState,
                        password: {...formFields.password, error: FormError.PASSWORD_REQUIRED},
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
                        type="submit">Zaloguj się
                    </button>
                </div>
            </form>
        </div>
    );
}