import AQIndexCard from "@/components/content/dashboard/AQIndexCard";
import React, {useCallback, useEffect, useState} from "react";
import EnhancedQualityResponse from "@/utils/air-quality/types/enhancedQualityResponse";
import PollutantsCard from "@/components/content/dashboard/PollutantsCard";
import airService from "@/utils/air-quality/airService";
import {Session} from "next-auth";
import {isContainRole} from "@/utils/methods";
import Role from "@/utils/api/auth/types/role";
import {Status} from "@/utils/types";

export default function AirQualityCards({session}: { session: Session }) {
    const [quality, setQuality] = useState<{
        response?: EnhancedQualityResponse,
        status: Status,
    }>({status: Status.LOADING});

    const fetchQualityData = useCallback(async () => {
        return await airService.getQuality<EnhancedQualityResponse>(
            session, 'Aleja Powstańców Warszawy 12', '35-959'
        );
    }, [session]);

    useEffect(() => {
        fetchQualityData()
            .then(res => setQuality({response: res, status: Status.READY}))
            .catch(err => setQuality({status: Status.ERROR}));
    }, [fetchQualityData]);

    return (
        <>
            <div className="grid grid-cols-1 gap-card-between">
                <AQIndexCard data={quality}/>
            </div>
            {
                isContainRole(session, Role.SUBSCRIBED) && (
                    <div className="h-20 grid grid-cols-1 gap-card-between">
                        <PollutantsCard data={quality}/>
                    </div>
                )
            }
        </>
    );
}