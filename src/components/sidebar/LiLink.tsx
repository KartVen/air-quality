import Link from "next/link";
import type {UrlObject} from "url";
import React, {MouseEventHandler} from "react";
import {clsx} from "clsx";

interface LiLinkProps {
    className?: string;
    href: string | UrlObject,
    onClick?: MouseEventHandler<HTMLAnchorElement>
    children?: React.ReactNode;
}

export default function LiLink({className, href, onClick, children}: LiLinkProps) {
    return (
        <li><Link
            href={href}
            className={clsx(
                "w-full flex items-center justify-center px-4 py-3 bg-primary hover:bg-primary-hover transition-colors duration-300 rounded-2xl",
                className
            )}
            onClick={onClick}>
            {children}
        </Link></li>
    );
}