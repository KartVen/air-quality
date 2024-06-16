import "./globals.css";
import type {Metadata} from "next";
import SessionNextProvider from "@/components/auth/SessionNextProvider";

export const metadata: Metadata = {
    title: "Air Quality",
    description: "Aplikacja do monitorowania jakości powietrza",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
    return (
        <SessionNextProvider>
            <html lang="pl">
            <body className="font-primary">
                {children}
            </body>
            </html>
        </SessionNextProvider>
    );
}
