import Link from "next/link";
import type {UrlObject} from "url";

interface AuthModeChangeBlockProps {
    label: string;
    newHref: string | UrlObject;
    linkLabel: string;
}

export default function SignChanger({label, newHref, linkLabel}: AuthModeChangeBlockProps) {
    return (
        <p className="pt-9 text-center">{label}&nbsp;
            <Link className="font-semibold hover:text-gray-400" href={newHref}>{linkLabel}</Link>
        </p>
    );
}