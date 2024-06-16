interface CardProps {
    children: React.ReactNode;
}

export default function Card({children}: CardProps) {
    return <div className="h-full px-5 py-7 bg-primary rounded-2xl">{children}</div>;
}