import {clsx} from "clsx";

interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export default function Card({className, children}: CardProps) {
    return <div className={clsx("h-full px-5 py-7 bg-primary rounded-2xl",
        className
    )}>{children}</div>;
}