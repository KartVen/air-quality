import LiLink from "@/components/sidebar/LiLink";
import SidebarGroup from "@/components/sidebar/SidebarGroup";
import LiButton from "@/components/sidebar/LiButton";
import React from "react";
import {BiLogOut} from "react-icons/bi";
import {isContainRole, Role} from "@/utils/auth/utils/helpers";
import {GiUpgrade} from "react-icons/gi";
import usePersistentSession from "@/utils/auth/usePersistentSession";
import {signIn, signOut} from "next-auth/react";

export default function SidebarMenu() {

    const {session} = usePersistentSession();

    const handleUpgradePlan = () => {

    }

    return (
        <div className="flex flex-col gap-3">
            <SidebarGroup>
                <LiLink href="/">Dashboard</LiLink>
                {session && (
                    <>
                        {isContainRole(session, Role.ADMIN) && <LiLink href="/subscriptions">Subskrypcje</LiLink>}
                        <LiLink href="/settings">Ustawienia</LiLink>
                    </>
                )}
            </SidebarGroup>
            <SidebarGroup>
                {session && !isContainRole(session, Role.SUBSCRIBED) && (
                    <LiButton className="text-yellow-500" onClick={handleUpgradePlan}>Ulepsz do Pro&nbsp;
                        <GiUpgrade/></LiButton>
                )}
            </SidebarGroup>
        </div>
    );
}