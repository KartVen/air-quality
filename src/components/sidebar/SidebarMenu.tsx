import LiLink from "@/components/sidebar/LiLink";
import SidebarGroup from "@/components/sidebar/SidebarGroup";
import LiButton from "@/components/sidebar/LiButton";
import React, {useCallback, useEffect, useState} from "react";
import {GiUpgrade} from "react-icons/gi";
import subscriptionService from "@/utils/api/subscription/subscriptionService";
import {useSession} from "next-auth/react";
import SubscriptionStatus from "@/utils/api/subscription/models/subscriptionStatus";
import {isContainRole} from "@/utils/methods";
import Role from "@/utils/api/auth/types/role";
import Path from "@/utils/path";

enum SubButtonMode {
    ACTIVE,
    HIDDEN,
    BLOCK,
}

export default function SidebarMenu() {
    const [subButtonMode, setSubButtonMode] =
        useState<SubButtonMode>(SubButtonMode.HIDDEN);
    const {data: session} = useSession();

    useEffect(() => {
        if (session) !session.user.isVerified
            ? setSubButtonMode(SubButtonMode.HIDDEN)
            : (async () => {
                subscriptionService.status(session)
                    .then(status => {
                        status === SubscriptionStatus.NOT_REQUESTED && setSubButtonMode(SubButtonMode.ACTIVE);
                    })
            })();
    }, [session]);

    const handleUpgradePlan = () => {
        session && subscriptionService.request(session)
            .then(() => setSubButtonMode(SubButtonMode.HIDDEN))
            .catch(() => setSubButtonMode(SubButtonMode.HIDDEN))
    }

    return (
        <div className="flex flex-col gap-3">
            <SidebarGroup>
                <LiLink href={Path.HOME}>Dashboard</LiLink>
                {session && (
                    <>
                        {isContainRole(session, Role.ADMIN) && <LiLink href={Path.SUBSCRIPTIONS}>Subskrypcje</LiLink>}
                        <LiLink href={Path.SETTINGS}>Ustawienia</LiLink>
                    </>
                )}
            </SidebarGroup>
            <SidebarGroup>
                {session && !isContainRole(session, Role.SUBSCRIBED) && subButtonMode !== SubButtonMode.HIDDEN && (
                    <LiButton className="text-yellow-500"
                              onClick={handleUpgradePlan}
                              disabled={subButtonMode === SubButtonMode.BLOCK}
                    >Ulepsz do Pro&nbsp;
                        <GiUpgrade/></LiButton>
                )}
            </SidebarGroup>
        </div>
    );
}