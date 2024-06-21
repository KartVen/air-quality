import {clsx} from "clsx";
import React from "react";

export interface FormSelectOption {
    value: string | number;
    label: string;
}

interface FormSelectFieldProps {
    id: string;
    className?: string
    options: FormSelectOption[];
    isError?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: () => void;
}

const FormSelect = ({
                        id, className, options, isError = false, onChange = () => {
    }, onBlur = () => {
    }
                    }: FormSelectFieldProps) => {
    return (
        <select
            className={clsx(
                'w-full',
                className ?? `px-3 py-3 bg-transparent border-2 border-gray-700 rounded-2xl`,
                isError ? 'border-red-500' : 'border-gray-700'
            )}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
        >
            {options.map(({value, label}) => (
                <option className="w-full bg-body" key={value} value={value}>{label}</option>
            ))}
        </select>
    );
};

export default FormSelect;
