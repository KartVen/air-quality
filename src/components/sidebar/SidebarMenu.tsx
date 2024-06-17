import LiLink from "@/components/sidebar/LiLink";
import {signIn, signOut} from "next-auth/react";
import SidebarGroup from "@/components/sidebar/SidebarGroup";
import LiButton from "@/components/sidebar/LiButton";
import usePersistentSession from "@/utils/auth/usePersistentSession";
import React from "react";

export default function SidebarMenu() {
    const {session} = usePersistentSession();

    return (
        <div className="flex flex-col gap-3">
            <SidebarGroup>
                <LiLink href="#" label="Dashboard"/>
                <LiLink href="#" label="Subskrypcje"/>
                <LiLink href="#" label="Ustawienia"/>
            </SidebarGroup>
            <SidebarGroup>
                <LiButton className="text-yellow-600" label="Ulepsz do Pro" onClick={() => {
                }}/>
                {session
                    ? <LiButton className="text-red-600" label="Wyloguj się" onClick={() => signOut()}/>
                    : <LiLink className="text-green-600" label="Zaloguj się" href="/signin"/>
                }
            </SidebarGroup>
        </div>
    );
}