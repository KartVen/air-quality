import AQIndexCard from "@/components/content/dashboard/AQIndexCard";
import React, {useCallback, useEffect, useState} from "react";
import EnhancedQualityResponse from "@/utils/api/air-quality/types/enhancedQualityResponse";
import PollutantsCard from "@/components/content/dashboard/PollutantsCard";
import airService from "@/utils/api/air-quality/airService";
import {Session} from "next-auth";
import {isContainRole} from "@/utils/methods";
import Role from "@/utils/api/auth/types/role";
import {Status} from "@/utils/types";
import Address from "@/utils/api/notification/types/address";
import DashboardAiqChangeForm from "@/components/content/settings/DashboardAiqChangeForm";
import {BiEdit} from "react-icons/bi";

const defaultAddress: Address = {
    street: 'Aleja Powstańców Warszawy 12',
    postalCode: '35-959'
}

export default function AirQualityCards({session}: { session: Session }) {
    const [isChangeAddressMenu, setIsChangeAddressMenu] = useState<boolean>(false)
    const [address, setAddress] = useState<Address | undefined>();

    const [quality, setQuality] = useState<{
        response?: EnhancedQualityResponse,
        status: Status,
    }>({status: Status.LOADING});

    const fetchQualityData = useCallback(async () => {
        const targetAddress: Address = address
            ? address
            : (session && session.user.address)
                ? session.user.address
                : defaultAddress

        setAddress(targetAddress);

        return await airService.getQuality<EnhancedQualityResponse>(
            session, targetAddress.street, targetAddress.postalCode
        );
    }, [address, session]);

    useEffect(() => {
        fetchQualityData()
            .then(res => setQuality({response: res, status: Status.READY}))
            .catch(() => setQuality({status: Status.ERROR}));
    }, [fetchQualityData]);

    return (
        <>
            <div className="grid grid-cols-1 gap-card-between relative">
                {isChangeAddressMenu
                    ? <DashboardAiqChangeForm address={address} setAddress={address => setAddress(address)} />
                    : <AQIndexCard data={quality} session={session} address={address}
                                   setIsChangeAddressMenu={setIsChangeAddressMenu}/>
                }
            </div>
            {!isChangeAddressMenu && isContainRole(session, Role.SUBSCRIBED) && (
                <div className="h-20 grid grid-cols-1 gap-card-between">
                    <PollutantsCard data={quality}/>
                </div>
            )}
        </>
    );
}