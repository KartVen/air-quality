import React, {useEffect} from "react";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Path from "@/utils/path";
import {BsBellFill} from "react-icons/bs";
import {GrLogin, GrLogout} from "react-icons/gr";

export default function UserNav() {
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
    }, [session]);

    return <div className="flex gap-3 items-center">
        {session
            ? (
                <>
                    <span>{session.user.username}{!session.user.isVerified && ' (niezweryfikowany)'}</span>
                    <button className="px-1 text-yellow-600 hover:text-yellow-800"
                            onClick={() => router.push(Path.NOTIFICATIONS)}><BsBellFill /></button>
                    <button className="px-1 text-red-600 hover:text-red-800"
                            onClick={() => signOut()}><GrLogin/></button>
                </>
            )
            : <Link className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    href="/signin">Zaloguj się <GrLogout/></Link>
        }
    </div>;
}
