"use client";
import FormInputField, {FormFieldData, InputType} from "@/components/auth/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {FormErrors, PASSWORD_VALIDATOR, EMAIL_VALIDATOR} from "@/components/auth/form/utils/validators";
import {isAnyFormFieldError} from "@/components/auth/form/utils/helpers";
import {signIn} from "next-auth/react";
import authService from "@/utils/auth/authService";
import {useRouter} from "next/navigation";

enum FormFieldType {
    EMAIL,
    PASSWORD
}

const BAD_CREDENTIALS = "Nieprawidłowy login lub hasło";

export default function SignInForm() {
    const [formFields, setFormFields] =
        useState<{ [key: string]: FormFieldData; }>({
            email: {value: ''},
            password: {value: ''}
        });
    const [processError, setProcessError] = useState<string | null>();
    const router = useRouter();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            email: EMAIL_VALIDATOR.validate(formFields.email),
            password: PASSWORD_VALIDATOR.validate(formFields.password),
        };
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        authService.login(
            formFieldsValidated.email.value,
            formFieldsValidated.password.value,
        )
            .then(res => {
                console.log(res);
                return signIn('login', {
                    ...res,
                    redirect: false
                })
            })
            .then(() => router.push("/"))
            .catch(() => setProcessError(BAD_CREDENTIALS));
    };

    const handleOnChange = (type: FormFieldType, e: ChangeEvent<HTMLInputElement>) => {
        const newState: FormFieldData = {value: e.target.value, error: undefined};
        setFormFields({
            email: type == FormFieldType.EMAIL ? newState : formFields.email,
            password: type == FormFieldType.PASSWORD ? newState : formFields.password,
        });
    };

    const handleOnBlur = (type: FormFieldType) => {
        switch (type) {
            case FormFieldType.EMAIL:
                if (EMAIL_VALIDATOR.isEmpty(formFields.email))
                    setFormFields({
                        ...formFields,
                        email: {...formFields.email, error: FormErrors.EMAIL_REQUIRED},
                    });
                break;
            case FormFieldType.PASSWORD:
                if (PASSWORD_VALIDATOR.isEmpty(formFields.password))
                    setFormFields({
                        ...formFields,
                        password: {...formFields.password, error: FormErrors.PASSWORD_REQUIRED},
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
                    type={InputType.EMAIL}
                    id="email"
                    label="Email"
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