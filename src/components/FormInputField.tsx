import {clsx} from "clsx";
import React, {useEffect} from "react";

export interface FormFieldData {
    value: string;
    error?: string;
}

interface FormInputFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    value?: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void
}

export default function FormInputField({id, label, type = "text", placeholder, value, error, onChange, onBlur}: FormInputFieldProps) {
    return (
        <div>
            <label className="w-full block pl-2 pb-2 italic" htmlFor={id}>{label}</label>
            <input
                className={clsx(
                    `w-full px-3 py-3 bg-transparent border-2 border-gray-700 rounded-2xl`,
                    error ? 'border-red-500' : 'border-gray-700'
                )}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <span className="block text-red-500 pl-2 pt-1 text-sm">{error}</span>}
        </div>
    );
}
;