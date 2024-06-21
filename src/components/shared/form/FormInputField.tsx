import {clsx} from "clsx";
import React from "react";
import FormInput from "@/components/shared/form/FormInput";

export enum InputType {
    TEXT = "text",
    PASSWORD = "password",
    EMAIL = "email",
}

export interface FormFieldData {
    value: string;
    error?: string;
}

interface FormInputFieldProps {
    id: string;
    label: string;
    type?: InputType;
    placeholder: string;
    fieldData: FormFieldData
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void
}

export default function FormInputField({id, label, type = InputType.TEXT, placeholder, fieldData: {value, error}, onChange, onBlur}: FormInputFieldProps) {
    return (
        <div>
            <label className="w-full block pl-2 pb-2 italic" htmlFor={id}>{label}</label>
            <FormInput
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                isError={!!error}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <span className="block text-red-500 pl-2 pt-1.5 text-sm">{error}</span>}
        </div>
    );
};