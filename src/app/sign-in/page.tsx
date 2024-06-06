"use client"
import Link from "next/link";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex justify-center items-center bg-blue-900">
                <div className="block p-4 border-2 border-white">
                    <h1 className="text-5xl font-semibold tracking-widest text-shadow-xl">Air Quality</h1>
                </div>
            </div>
            <div className="w-1/2 flex justify-start items-center px-32">
                <div className="w-96">
                    <div className="w-full pb-9 text-center">
                        <h2 className="block text-3xl font-semibold">Zaloguj się</h2>
                        <p className="block pt-3 text-lg">Wpisz nazwę i hasło, aby kontynuować</p>
                    </div>
                    <div className="w-full">
                        <SignInForm/>
                        <p className="pt-9 text-center">Nie masz konta? <Link className="font-semibold hover:text-gray-400" href="#">Założ
                            konto</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}