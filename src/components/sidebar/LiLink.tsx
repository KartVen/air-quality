import Link from "next/link";
import type {UrlObject} from "url";
import {MouseEventHandler} from "react";

interface LiLinkProps {
    href: string | UrlObject,
    label: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default function LiLink({href, label, onClick}: LiLinkProps) {
    return (
        <li><Link
            href={href}
            className="block px-4 py-3 bg-primary hover:bg-primary-hover transition-colors duration-300 rounded-2xl text-center"
            onClick={onClick}>
            {label}
        </Link></li>
    );
}