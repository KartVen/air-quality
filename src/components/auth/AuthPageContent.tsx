interface AuthPageContentProps {
    children: React.ReactNode;
}

export default function AuthPageContent({children}: AuthPageContentProps) {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex justify-center items-center bg-body">
                <div className="block p-4 border-2">
                    <h1 className="text-5xl font-semibold tracking-widest text-shadow-xl">Air Quality</h1>
                </div>
            </div>
            <div className="w-1/2 flex justify-start items-center px-32">
                <div className="w-96">
                    {children}
                </div>
            </div>
        </div>
    );
}