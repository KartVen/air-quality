import Link from "next/link";

export default function Sidebar() {
    return (
        <>
            <div className="flex justify-center items-center pt-8">
                <div className="p-2 border-2">
                    <h1 className="font-semibold tracking-widest text-shadow-lg">Air Quality</h1>
                </div>
            </div>
            <ul className="w-52 pt-8 list-none">
                <li className="block px-4 py-3 mx-3"><Link href="#" className="font-semibold">Dashboard</Link></li>
            </ul>
        </>
    );
}