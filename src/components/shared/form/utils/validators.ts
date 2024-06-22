import {FormFieldData} from "@/components/shared/form/FormInputField";

export interface LengthRange {
    min: number; max?: number;
}

export abstract class Validator {
    abstract validate(field: FormFieldData): FormFieldData;
    protected abstract getLengthRange(): LengthRange;

    isEmpty({value}: FormFieldData): boolean {
        return !value || !value.trim()
    }
    isLengthRange({value}: FormFieldData): boolean {
        const range = this.getLengthRange();
        return value.length >= range.min && (!range.max || value.length < range.max);
    }
}

const PASSWORD_MIN_LENGTH = 8;
const USERNAME_MIN_LENGTH = 5;

export enum FormError {
    USERNAME_REQUIRED = 'Nazwa użytkownika jest wymagana',
    USERNAME_TOO_SHORT = `Nazwa użytkownika musi mieć co najmniej ${USERNAME_MIN_LENGTH} znaki/ów`,
    PASSWORD_REQUIRED = 'Hasło jest wymagane',
    PASSWORD_TOO_SHORT = `Hasło musi mieć co najmniej ${PASSWORD_MIN_LENGTH} znaków`,
    EMAIL_REQUIRED = 'Adres e-mail jest wymagany',
    EMAIL_INCORRECT = 'Nieprawidłowy adres e-mail',
    PASSWORDS_ARE_DIFFERENT = "Podane hasła różnią się",
    FIELD_REQUIRED = "Pole jest wymagane",
}

export enum ProcessingError {
    BAD_CREDENTIALS = "Nieprawidłowy login lub hasło",
    POST_LOGIN_ERROR = 'Błąd logowania. Spróbuj ponownie później',
    REGISTRATION_ERROR = "Nieznany błąd rejestracji! Spróbuj ponownie później",
    VALIDATION_ERROR = "Błąd rejestracji",
    POST_REGISTRATION_ERROR = "Rejestracje udana! Zaloguj się, aby kontynuować",
    SERVICE_UNAVAILABLE = "Błąd serwisu autoryzacyjnego. Przepraszamy",
}

export class UsernameValidator extends Validator {
    validate(field: FormFieldData): FormFieldData {
        let fieldError: string | undefined = undefined;

        if (this.isEmpty(field))
            fieldError = FormError.USERNAME_REQUIRED;
        else if (!this.isLengthRange(field))
            fieldError = FormError.USERNAME_TOO_SHORT;

        return ({...field, error: fieldError});
    }

    protected getLengthRange(): LengthRange {
        return {min: USERNAME_MIN_LENGTH};
    }
}

export const USERNAME_VALIDATOR = new UsernameValidator();

export class PasswordValidator extends Validator {
    validate(field: FormFieldData): FormFieldData {
        let fieldError: string | undefined = undefined;

        if (this.isEmpty(field))
            fieldError = FormError.PASSWORD_REQUIRED;
        else if (!this.isLengthRange(field))
            fieldError = FormError.PASSWORD_TOO_SHORT;

        return ({...field, error: fieldError});
    }

    protected getLengthRange(): LengthRange {
        return {min: PASSWORD_MIN_LENGTH};
    }
}

export const PASSWORD_VALIDATOR = new PasswordValidator();

export class EmailValidator extends Validator {
    validate(field: FormFieldData): FormFieldData {
        let fieldError: string | undefined = undefined;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (this.isEmpty(field))
            fieldError = FormError.EMAIL_REQUIRED;
        else if (!emailRegex.test(field.value))
            fieldError = FormError.EMAIL_INCORRECT;

        return ({...field, error: fieldError});
    }

    protected getLengthRange(): LengthRange {
        return {min: 1};
    }
}

export const EMAIL_VALIDATOR = new EmailValidator();

class CodeValidator extends Validator {
    validate(field: FormFieldData): FormFieldData {
        return ({...field, error: this.isEmpty(field) ? FormError.FIELD_REQUIRED : undefined});
    }

    protected getLengthRange(): LengthRange {
        return {min: 1};
    }
}

export const VALIDATOR = new CodeValidator();