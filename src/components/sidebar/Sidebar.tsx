"use client";
import SidebarMenu from "@/components/sidebar/SidebarMenu";

export default function Sidebar() {
    return (
        <>
            <div className="flex justify-center items-center pt-8">
                <div className="p-2 border-2">
                    <h1 className="font-semibold tracking-widest text-shadow-lg">Air Quality</h1>
                </div>
            </div>
            <div className="pt-8 px-3">
                <SidebarMenu/>
            </div>
        </>
    );
}