import React from "react";
import {FaPlus} from "react-icons/fa6";
import usePersistentSession from "@/utils/auth/usePersistentSession";
import {signIn, signOut, useSession} from "next-auth/react";
import {LuLogIn, LuLogOut} from "react-icons/lu";
import Link from "next/link";

export default function UserNav() {
    const {data: session} = useSession();

    return <div className="flex gap-4 font-semibold items-center">
        {session && <span>{session.user.username}</span>}
        {session
            ? <button className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      onClick={() => signOut()}>Wyloguj się <LuLogIn/></button>
            : <Link className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    href="/signin">Zaloguj się <LuLogOut/></Link>
        }
    </div>;
}
