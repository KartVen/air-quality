"use client";
import FormInputField, {FormFieldData, InputType} from "@/components/shared/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {FormError, PASSWORD_VALIDATOR} from "@/components/shared/form/utils/validators";
import {isAnyFormFieldError, isSameValues} from "@/components/shared/form/utils/helpers";
import {useSession} from "next-auth/react";
import profileService from "@/utils/api/profile/profileService";

const NEW_PASSWORD_ERROR = "Błąd zmiany hasła";
const NEW_PASSWORD_SUCCESS = "Zmieniono!";

interface FormFields {
    old_password: FormFieldData;
    new_password: FormFieldData;
    new_password_2: FormFieldData;
}

const defaultFormFieldsValues: FormFields = {
    old_password: {value: ''},
    new_password: {value: ''},
    new_password_2: {value: ''},
}

const formFieldsInputs: { id: keyof FormFields, type: InputType, [key: string]: string }[] = [
    {
        id: "old_password",
        type: InputType.PASSWORD,
        label: "Stare hasło",
        placeholder: "Twoje hasło",
    },
    {
        id: "new_password",
        type: InputType.PASSWORD,
        label: "Nowe hasło",
        placeholder: "Twoje hasło",
    },
    {
        id: "new_password_2",
        type: InputType.PASSWORD,
        label: "Powtórz hasło",
        placeholder: "Twoje hasło",
    },
];

export default function PasswordChangeForm() {
    const {data: session, update: updateSession} = useSession();
    const [formFields, setFormFields] =
        useState<FormFields>(defaultFormFieldsValues);
    const [isProcessSuccess, setIsProcessSuccess] = useState<boolean>(false)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            old_password: formFields.old_password,
            new_password: PASSWORD_VALIDATOR.validate(formFields.new_password),
            new_password_2: isSameValues(formFields.new_password.value, formFields.new_password_2.value)
                ? PASSWORD_VALIDATOR.validate(formFields.new_password_2)
                : {...formFields.new_password_2, error: FormError.PASSWORDS_ARE_DIFFERENT},
        } satisfies FormFields;
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        session && profileService.changePassword(session, formFieldsValidated.old_password.value, formFieldsValidated.new_password.value)
            .then(() => (setIsProcessSuccess(true)))
            .catch(err => {
                console.debug(err);
                setIsProcessSuccess(false);
            });
    };

    const handleOnChange = (field: keyof FormFields, e: ChangeEvent<HTMLInputElement>) => {
        setFormFields(prevFormFields => ({
            ...prevFormFields,
            [field]: {value: e.target.value, error: undefined}
        }));
    };

    const handleOnBlur = (field: keyof FormFields) => {
        if (PASSWORD_VALIDATOR.isEmpty(formFields[field]))
            setFormFields(prevState => ({
                ...prevState,
                [field]: {...formFields[field], error: FormError.PASSWORD_REQUIRED},
            }));
    };


    return <div>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="flex flex-row gap-5">
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
            </div>
            <div className="flex justify-center items-center pt-2">
                <button className="w-1/2 p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold" type="submit">
                    Zmień
                </button>
            </div>
        </form>
        {isProcessSuccess && <div className="w-full pt-2 text-green-500 text-center">{NEW_PASSWORD_SUCCESS}</div>}
    </div>;
}