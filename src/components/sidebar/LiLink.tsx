import Link from "next/link";
import type {UrlObject} from "url";
import {MouseEventHandler} from "react";
import {clsx} from "clsx";

interface LiLinkProps {
    className?: string;
    href: string | UrlObject,
    label: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default function LiLink({className, href, label, onClick}: LiLinkProps) {
    return (
        <li><Link
            href={href}
            className={clsx(
                "block w-full px-4 py-3 bg-primary hover:bg-primary-hover transition-colors duration-300 rounded-2xl text-center",
                className
            )}
            onClick={onClick}>
            {label}
        </Link></li>
    );
}