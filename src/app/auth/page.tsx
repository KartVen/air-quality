"use client"
import Link from "next/link";
import SignInForm from "@/components/SignInForm";
import {useState} from "react";
import SignUpForm from "@/components/SignUpForm";

enum AuthMode {
    SIGN_IN,
    SIGN_UP
}

export default function SignInAndSignUpPage() {
    const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGN_IN);

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex justify-center items-center bg-blue-900">
                <div className="block p-4 border-2">
                    <h1 className="text-5xl font-semibold tracking-widest text-shadow-xl">Air Quality</h1>
                </div>
            </div>
            <div className="w-1/2 flex justify-start items-center px-32">
                <div className="w-96">
                    <div className="w-full text-center">
                        {authMode === AuthMode.SIGN_IN ? (
                            <>
                                <h2 className="block text-3xl font-semibold">Zaloguj się</h2>
                                <p className="block pt-3 text-lg">Wpisz nazwę i hasło, aby kontynuować</p>
                            </>
                        ) : (
                            <>
                                <h2 className="block text-3xl font-semibold">Nowe konto</h2>
                                <p className="block pt-3 text-lg">Uzupełnij dane, aby móc założyć konto</p>
                            </>
                        )}
                    </div>
                    <div className="w-full pt-4">
                        {authMode === AuthMode.SIGN_IN ? (
                            <>
                                <SignInForm/>
                                <p className="pt-9 text-center">Nie masz konta?&nbsp;
                                    <Link
                                        className="font-semibold hover:text-gray-400" href="#"
                                        onClick={() => setAuthMode(AuthMode.SIGN_UP)}
                                    >Założ konto</Link>
                                </p>
                            </>
                        ) : (
                            <>
                                <SignUpForm/>
                                <p className="pt-9 text-center">Masz konto?&nbsp;
                                    <Link className="font-semibold hover:text-gray-400"
                                          href="#"
                                          onClick={() => setAuthMode(AuthMode.SIGN_IN)}
                                    >Zaloguj się</Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}