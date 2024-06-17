"use client";
import FormInputField, {FormFieldData, InputType} from "@/components/auth/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {
    EMAIL_VALIDATOR,
    FormErrors,
    PASSWORD_VALIDATOR,
    USERNAME_VALIDATOR
} from "@/components/auth/form/utils/validators";
import {isAnyFormFieldError, isSameValues} from "@/components/auth/form/utils/helpers";
import authService from "@/utils/auth/authService";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

enum FormFieldType {
    USERNAME,
    EMAIL,
    PASSWORD,
    PASSWORD_2
}

const PASSWORDS_ARE_DIFFERENT = "Podane hasła różnią się";
const REGISTRATION_ERROR = "Błąd rejestracji! Spróbuj ponownie póżniej.";

export default function SignUpForm() {
    const [formFields, setFormFields] =
        useState<{ [key: string]: FormFieldData; }>({
            username: {value: ''},
            email: {value: ''},
            password: {value: ''},
            password_2: {value: ''}
        });
    const [processError, setProcessError] = useState<string | null>();
    const router = useRouter();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            username: USERNAME_VALIDATOR.validate(formFields.username),
            email: EMAIL_VALIDATOR.validate(formFields.email),
            password: PASSWORD_VALIDATOR.validate(formFields.password),
            password_2: isSameValues(formFields.password.value, formFields.password_2.value)
                ? PASSWORD_VALIDATOR.validate(formFields.password_2)
                : {...formFields.password_2, error: PASSWORDS_ARE_DIFFERENT},
        };
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        authService.register(
            formFieldsValidated.email.value,
            formFieldsValidated.username.value,
            formFieldsValidated.password.value,
        )
            .then(res => {
                console.log(res);
                return signIn('register', {
                    ...res,
                    redirect: false
                })
            })
            .then(() => router.push("/"))
            .catch(() => setProcessError(REGISTRATION_ERROR));
    };

    const handleOnChange = (
        type: FormFieldType,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const newState: FormFieldData = {value: e.target.value, error: undefined};
        setFormFields({
            username: type == FormFieldType.USERNAME ? newState : formFields.username,
            email: type == FormFieldType.EMAIL ? newState : formFields.email,
            password: type == FormFieldType.PASSWORD ? newState : formFields.password,
            password_2: type == FormFieldType.PASSWORD_2 ? newState : formFields.password_2,
        });
    };

    const handleOnBlur = (type: FormFieldType) => {
        switch (type) {
            case FormFieldType.USERNAME:
                if (USERNAME_VALIDATOR.isEmpty(formFields.username))
                    setFormFields({
                        ...formFields,
                        username: {...formFields.username, error: FormErrors.USERNAME_REQUIRED},
                    });
                break;
            case FormFieldType.EMAIL:
                setFormFields({
                    ...formFields,
                    email: EMAIL_VALIDATOR.validate(formFields.email),
                });
                break;
            case FormFieldType.PASSWORD:
                if (PASSWORD_VALIDATOR.isEmpty(formFields.password))
                    setFormFields({
                        ...formFields,
                        password: {...formFields.password, error: FormErrors.PASSWORD_REQUIRED},
                    });
                break;
            case FormFieldType.PASSWORD_2:
                if (PASSWORD_VALIDATOR.isEmpty(formFields.password_2))
                    setFormFields({
                        ...formFields,
                        password_2: {...formFields.password_2, error: FormErrors.PASSWORD_REQUIRED},
                    });
                break;
        }
    };

    return (
        <div>
            <div className={`w-full${!processError && ' pt-5'}`}>
                {processError && <span className="block text-red-500 pb-5 text-center">{processError}</span>}
            </div>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <FormInputField
                    id="username"
                    label="Nazwa użytkownika"
                    placeholder="Twoja nazwa użytkownika"
                    fieldData={formFields.username}
                    onChange={e => handleOnChange(FormFieldType.USERNAME, e)}
                    onBlur={() => handleOnBlur(FormFieldType.USERNAME)}
                />
                <FormInputField
                    type={InputType.EMAIL}
                    id="email"
                    label="Adres e-email"
                    placeholder="Twój adres e-mail"
                    fieldData={formFields.email}
                    onChange={e => handleOnChange(FormFieldType.EMAIL, e)}
                    onBlur={() => handleOnBlur(FormFieldType.EMAIL)}
                />
                <FormInputField
                    type={InputType.PASSWORD}
                    id="password"
                    label="Hasło"
                    placeholder="Twoje hasło"
                    fieldData={formFields.password}
                    onChange={e => handleOnChange(FormFieldType.PASSWORD, e)}
                    onBlur={() => handleOnBlur(FormFieldType.PASSWORD)}
                />
                <FormInputField
                    type={InputType.PASSWORD}
                    id="password_2"
                    label="Powtórz hasło"
                    placeholder="Twoje hasło"
                    fieldData={formFields.password_2}
                    onChange={e => handleOnChange(FormFieldType.PASSWORD_2, e)}
                    onBlur={() => handleOnBlur(FormFieldType.PASSWORD_2)}
                />
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