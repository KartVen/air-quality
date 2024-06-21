import {clsx} from "clsx";
import React from "react";

export enum InputType {
    TEXT = "text",
    PASSWORD = "password",
    EMAIL = "email",
    NUMBER = "number",
}

interface FormInputFieldProps {
    id: string;
    className?: string;
    type?: InputType;
    placeholder: string;
    value: string | number;
    isError?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void
}

export default function FormInput({id, className, type = InputType.TEXT, placeholder, value, onChange = () => {}, onBlur = () => {}, isError = false}: FormInputFieldProps) {
    return (
        <input
            className={clsx(
                'w-full',
                className ?? `px-3 py-3 bg-transparent border-2 border-gray-700 rounded-2xl`,
                isError ? 'border-red-500' : 'border-gray-700'
            )}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};