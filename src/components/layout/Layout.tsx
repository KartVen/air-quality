import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";
import Header from "@/components/layout/Header";

interface MainContentProps {
    pageTitle: string;
    children?: React.ReactNode;
}

export default function Layout({pageTitle, children = []}: MainContentProps) {
    return (
        <div className="flex h-screen bg-body">
            <div className="flex flex-col px-4">
                <Sidebar/>
            </div>
            <div className="flex-1 flex flex-col gap-cards-row px-8 py-7">
                <Header title={pageTitle}/>
                <main className="flex flex-col gap-[1.75rem]">{children}</main>
            </div>
        </div>
    );
}