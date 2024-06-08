import Sidebar from "@/components/menu/Sidebar";
import {FaCaretDown, FaPlus} from "react-icons/fa";
import React from "react";
import Header from "@/components/main/Header";

interface MainContentProps {
    pageTitle: string;
    children?: React.ReactNode;
}

export default function Content({pageTitle, children = []}: MainContentProps) {
    return (
        <div className="flex h-screen bg-blue-900">
            <div className="flex flex-col px-4">
                <Sidebar/>
            </div>
            <div className="flex-1 flex flex-col gap-8 px-8 py-7">
                <Header title={pageTitle}/>
                <main className="bg-amber-950">{children}</main>
            </div>
        </div>
    );
}