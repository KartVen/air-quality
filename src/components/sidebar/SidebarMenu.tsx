import LiLink from "@/components/sidebar/LiLink";
import SidebarGroup from "@/components/sidebar/SidebarGroup";
import LiButton from "@/components/sidebar/LiButton";
import React, {useEffect, useState} from "react";
import {GiUpgrade} from "react-icons/gi";
import subscriptionService from "@/utils/api/subscription/subscriptionService";
import {useSession} from "next-auth/react";
import SubscriptionStatus from "@/utils/api/subscription/models/subscriptionStatus";
import {isContainRole} from "@/utils/methods";
import Role from "@/utils/api/auth/types/role";
import Path from "@/utils/path";
import Popup from "reactjs-popup";
import {tree} from "next/dist/build/templates/app-page";

enum SubButtonMode {
    ACTIVE,
    HIDDEN,
    BLOCK,
}

export default function SidebarMenu() {
    const [subButtonMode, setSubButtonMode] =
        useState<SubButtonMode>(SubButtonMode.HIDDEN);
    const {data: session} = useSession();
    const [desc, setDesc] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
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

    const handlePopup = (isOpen: boolean) => setIsOpen(isOpen);

    const handleUpgradePlan = () => {
        console.log(session);
        session && subscriptionService.request(session, desc).finally(() => setSubButtonMode(SubButtonMode.HIDDEN))
        setDesc('');
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
                              onClick={() => handlePopup(true)}
                              disabled={subButtonMode === SubButtonMode.BLOCK}
                    >Ulepsz do Pro&nbsp;
                        <GiUpgrade/></LiButton>
                )}
                <Popup open={isOpen} position="right center" contentStyle={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.35)',
                }} onClose={handleUpgradePlan}>
                    <div
                        className="bg-primary text-center p-5 w-1/3 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px solid rgb(14 28 67)] rounded-2xl">
                        <div className="flex flex-col gap-2 pb-3">
                            <label>Dodatkowe uwagi:</label>
                            <input
                                className="bg-body p-1 rounded-xs"
                                type="text"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        <button onClick={() => handlePopup(false)}
                                className="bg-body hover:bg-primary-hover text-white px-3 py-1">Wyślij
                        </button>
                    </div>
                </Popup>
            </SidebarGroup>
        </div>
    );
}