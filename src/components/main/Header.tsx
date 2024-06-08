import {FaCaretDown, FaPlus} from "react-icons/fa";
import React from "react";

interface HeaderProps {
    title: string;
}

export default function Header({title}: HeaderProps) {
    return (
        <header className="h-10 px-3 py-5 flex justify-between items-center bg-amber-950">
            <div className="font-semibold">{title}</div>
            <div className="flex gap-4">
                <div className="flex items-center text-base text-yellow-600 font-semibold">
                    Ulepsz do Pro&nbsp;<FaPlus/>
                </div>
                <div>
                    <button className="flex items-center text-base">newuser&nbsp;<FaCaretDown/></button>
                </div>
            </div>
        </header>
    );
}