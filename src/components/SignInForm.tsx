import FormInputField, {FormFieldData} from "@/components/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {FormErrors, PASSWORD_VALIDATOR, USERNAME_VALIDATOR} from "@/components/form/util/validators";

enum FormFieldType {
    USERNAME,
    PASSWORD
}

export default function SignInForm() {
    const [formFields, setFormFields] =
        useState<{ username: FormFieldData, password: FormFieldData }>({
            username: {value: ''},
            password: {value: ''}
        });
    const [processError, setProcessError] = useState<string | null>();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        setFormFields({
            username: USERNAME_VALIDATOR.validate(formFields.username),
            password: PASSWORD_VALIDATOR.validate(formFields.password),
        });

        if (formFields.username.error || formFields.password.error) return;

        const usernameValue = formFields.username.value.replace(/(<([^>]+)>)/ig, "");
        const passwordValue = formFields.password.value.replace(/(<([^>]+)>)/ig, "");
        setProcessError("Nieprawidłowy login lub hasło");
    };

    const handleOnChange = (
        type: FormFieldType,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        var newState: FormFieldData = {value: e.target.value, error: undefined};
        setFormFields({
            username: type == FormFieldType.USERNAME ? newState : formFields.username,
            password: type == FormFieldType.PASSWORD ? newState : formFields.password,
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
                    id="username"
                    label="Nazwa użytkownika"
                    placeholder="Twoja nazwa użytkownika"
                    value={formFields.username.value}
                    error={formFields.username.error}
                    onChange={e => handleOnChange(FormFieldType.USERNAME, e)}
                    onBlur={() => handleOnBlur(FormFieldType.USERNAME)}
                />
                <FormInputField
                    type="password"
                    id="password"
                    label="Hasło"
                    placeholder="Twoje hasło"
                    value={formFields.password.value}
                    error={formFields.password.error}
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