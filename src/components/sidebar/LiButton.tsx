import Link from "next/link";
import type {UrlObject} from "url";
import {MouseEventHandler} from "react";
import {clsx} from "clsx";

interface LiLinkProps {
    className?: string;
    label: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function LiButton({className = '', label, onClick}: LiLinkProps) {
    return (
        <li>
            <button
                className={clsx(
                    "block w-full px-4 py-3 bg-primary hover:bg-primary-hover transition-colors duration-300 rounded-2xl text-center",
                    className
                )}
                onClick={onClick}>
                {label}
            </button>
        </li>
    );
}