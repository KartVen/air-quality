import {MouseEventHandler} from "react";
import {clsx} from "clsx";

interface LiLinkProps {
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean
    children?: React.ReactNode;
}

export default function LiButton({className = '', onClick, disabled = false, children}: LiLinkProps) {
    return (
        <li>
            <button
                disabled={disabled}
                className={clsx(
                    "w-full flex items-center justify-center px-4 py-3 bg-primary hover:bg-primary-hover transition-colors duration-300 rounded-2xl text-center",
                    className
                )}
                onClick={onClick}>
                {children}
            </button>
        </li>
    );
}