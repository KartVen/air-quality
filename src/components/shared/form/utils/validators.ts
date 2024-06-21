import {FormFieldData} from "@/components/shared/form/FormInputField";

interface LengthRange {
    min: number;
    max?: number;
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

export enum FormErrors {
    USERNAME_REQUIRED = 'Nazwa użytkownika jest wymagana',
    USERNAME_TOO_SHORT = `Nazwa użytkownika musi mieć co najmniej ${USERNAME_MIN_LENGTH} znaki/ów`,
    PASSWORD_REQUIRED = 'Hasło jest wymagane',
    PASSWORD_TOO_SHORT = `Hasło musi mieć co najmniej ${PASSWORD_MIN_LENGTH} znaków`,
    EMAIL_REQUIRED = 'Adres e-mail jest wymagany',
    EMAIL_INCORRECT = 'Nieprawidłowy adres e-mail'
}

export class UsernameValidator extends Validator {
    validate(field: FormFieldData): FormFieldData {
        let fieldError: string | undefined = undefined;

        if (this.isEmpty(field))
            fieldError = FormErrors.USERNAME_REQUIRED;
        else if (!this.isLengthRange(field))
            fieldError = FormErrors.USERNAME_TOO_SHORT;

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
            fieldError = FormErrors.PASSWORD_REQUIRED;
        else if (!this.isLengthRange(field))
            fieldError = FormErrors.PASSWORD_TOO_SHORT;

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
            fieldError = FormErrors.EMAIL_REQUIRED;
        else if (!emailRegex.test(field.value))
            fieldError = FormErrors.EMAIL_INCORRECT;

        return ({...field, error: fieldError});
    }

    protected getLengthRange(): LengthRange {
        return {min: 1};
    }
}

export const EMAIL_VALIDATOR = new EmailValidator();