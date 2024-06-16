import {FormFieldData} from "@/components/auth/form/FormInputField";

export const isAnyFormFieldError = (formFields: { [p: string]: FormFieldData }): boolean => {
    return Object.values(formFields).some(field => !!field.error)
}

export const isSameValues = (valueA?: string, valueB?: string): boolean => valueA === valueB;