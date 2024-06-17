import "./globals.css";
import type {Metadata} from "next";
import React from "react";
import SessionProviderWrapper from "@/components/auth/SessionProviderWrapper";

export const metadata: Metadata = {
    title: "Air Quality",
    description: "Aplikacja do monitorowania jakości powietrza",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
    return (
        <SessionProviderWrapper>
            <html lang="pl">
            <body className="font-primary">
            {children}
            </body>
            </html>
        </SessionProviderWrapper>
    );
}
