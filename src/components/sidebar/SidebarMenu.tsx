import LiLink from "@/components/sidebar/LiLink";
import SidebarGroup from "@/components/sidebar/SidebarGroup";
import LiButton from "@/components/sidebar/LiButton";
import React, {useEffect, useState} from "react";
import {isContainRole, Role} from "@/utils/auth/utils/helpers";
import {GiUpgrade} from "react-icons/gi";
import subscriptionService from "@/utils/subscription/subscriptionService";
import {useSession} from "next-auth/react";
import SubscriptionStatus from "@/utils/subscription/models/subscriptionStatus";

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
                subscriptionService.status(session.tokens.accessToken)
                    .then(status => {
                        status === SubscriptionStatus.NOT_REQUESTED && setSubButtonMode(SubButtonMode.ACTIVE);
                    })
            })();
    }, [session]);

    const handleUpgradePlan = () => {
        session && subscriptionService.request(session.tokens.accessToken)
            .then(() => setSubButtonMode(SubButtonMode.HIDDEN))
            .catch(() => setSubButtonMode(SubButtonMode.HIDDEN))
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