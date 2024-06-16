import React from "react";
import UserNav from "@/components/layout/header/UserNav";

interface HeaderProps {
    title: string;
}

export default function Header({title}: HeaderProps) {
    return (
        <header className="h-10 px-5 py-6 flex justify-between items-center bg-primary rounded-xl">
            <div className="font-semibold">{title}</div>
            <UserNav/>
        </header>
    );
}