export default function LoadingPage() {
    return <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 bg-body z-10">
        <div className="h-12 aspect-square border-t-2 border-blue-500 animate-spin rounded-full" />
    </div>;
};