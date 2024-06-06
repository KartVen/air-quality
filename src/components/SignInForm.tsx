import FormInputField, {FormFieldData} from "@/components/FormInputField";
import React, {ChangeEvent, FormEvent, SetStateAction, useState} from "react";

const PASSWORD_MIN_LENGTH = 8;
const USERNAME_MIN_LENGTH = 5;

enum FORM_ERROR {
    USERNAME_REQUIRED = 'Nazwa użytkownika jest wymagana',
    USERNAME_TOO_SHORT = `Nazwa użytkownika musi mieć co najmniej ${USERNAME_MIN_LENGTH} znaki`,
    PASSWORD_REQUIRED = 'Hasło jest wymagane',
    PASSWORD_TOO_SHORT = `Hasło musi mieć co najmniej ${PASSWORD_MIN_LENGTH} znaków`
}

enum FORM_FIELD_TYPE {
    USERNAME,
    PASSWORD
}

export default function SignInForm() {
    const [usernameField, setUsernameField] = useState<FormFieldData>({value: ''});
    const [passwordField, setPasswordField] = useState<FormFieldData>({value: ''});
    const [error, setError] = useState<string | null>(null);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        let usernameError: string | undefined = undefined;
        let passwordError: string | undefined = undefined;

        if (!usernameField.value || !usernameField.value.trim())
            usernameError = FORM_ERROR.USERNAME_REQUIRED;
        else if (usernameField.value.length < USERNAME_MIN_LENGTH)
            usernameError = FORM_ERROR.USERNAME_TOO_SHORT;

        if (!passwordField.value || !passwordField.value.trim())
            passwordError = FORM_ERROR.PASSWORD_REQUIRED;
        else if (passwordField.value.length < PASSWORD_MIN_LENGTH)
            passwordError = FORM_ERROR.PASSWORD_TOO_SHORT;

        setUsernameField({...usernameField, error: usernameError});
        setPasswordField({...passwordField, error: passwordError});

        if (usernameError || passwordError) return;

        const usernameValue = usernameField.value.replace(/(<([^>]+)>)/ig, "");
        const passwordValue = passwordField.value.replace(/(<([^>]+)>)/ig, "");
        console.log(usernameValue, passwordValue);
    };

    const handleFieldChange = (
        setFunction: (data: FormFieldData) => void,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setFunction({value: e.target.value, error: undefined});
    };

    const handleBlur = (type: FORM_FIELD_TYPE) => {
        switch (type) {
            case FORM_FIELD_TYPE.USERNAME:
                if (!usernameField.value || !usernameField.value.trim())
                    setUsernameField({...usernameField, error: FORM_ERROR.USERNAME_REQUIRED});
                break;
            case FORM_FIELD_TYPE.PASSWORD:
                if (!passwordField.value || !passwordField.value.trim())
                    setPasswordField({...passwordField, error: FORM_ERROR.PASSWORD_REQUIRED});
                break;
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <FormInputField
                id="username"
                label="Nazwa użytkownika"
                placeholder="Twoja nazwa użytkownika"
                value={usernameField.value}
                error={usernameField.error}
                onChange={e => handleFieldChange(setUsernameField, e)}
                onBlur={() => handleBlur(FORM_FIELD_TYPE.USERNAME)}
            />
            <FormInputField
                id="password"
                label="Hasło"
                placeholder="Twoje hasło"
                value={passwordField.value}
                error={passwordField.error}
                onChange={e => handleFieldChange(setPasswordField, e)}
                onBlur={() => handleBlur(FORM_FIELD_TYPE.PASSWORD)}
            />
            <div className="flex justify-center items-center pt-6">
                <button
                    className="w-full p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold"
                    type="submit">Zaloguj się
                </button>
            </div>
        </form>
    );
}