import Link from "next/link";
import type {UrlObject} from "url";

interface AuthModeChangeBlockProps {
    label?: string;
    newHref: string | UrlObject;
    linkLabel: string;
    noStrong?: boolean;
}

export default function SignChanger({label = '', newHref, linkLabel, noStrong = false}: AuthModeChangeBlockProps) {
    return (
        <p className="pt-9 text-center">{label ? `${label} ` : ''}
            <Link className={`${!noStrong ? 'font-semibold ' : ''}hover:text-gray-400`}
                  href={newHref}>{linkLabel}</Link>
        </p>
    );
}