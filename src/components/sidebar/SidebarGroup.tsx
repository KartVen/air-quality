export default function SidebarGroup({children}: { children?: React.ReactNode }) {
    return (
        <ul className="w-52 flex flex-col gap-3 list-none font-semibold">
            {children}
        </ul>
    );
}