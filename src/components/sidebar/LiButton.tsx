import Link from "next/link";
import type {UrlObject} from "url";
import {MouseEventHandler} from "react";
import {clsx} from "clsx";

interface LiLinkProps {
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>,
    children?: React.ReactNode;
}

export default function LiButton({className = '', onClick, children}: LiLinkProps) {
    return (
        <li>
            <button
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