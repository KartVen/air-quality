interface RightBlockProps {
    label: string;
    info: string;
    children: React.ReactNode
}

export default function RightBlock({label, info, children}: RightBlockProps) {
    return (
        <>
            <div className="w-full text-center">
                <h2 className="block text-3xl font-semibold">{label}</h2>
                <p className="block pt-3 text-lg">{info}</p>
            </div>
            <div className="w-full pt-4">{children}</div>
        </>
    );
}