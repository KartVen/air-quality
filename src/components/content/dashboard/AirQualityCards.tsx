import AQIndexCard from "@/components/content/dashboard/AQIndexCard";
import React, {useEffect, useState} from "react";
import EnhancedQualityResponse from "@/utils/air-quality/models/enhancedQualityResponse";
import {isContainRole, Role} from "@/utils/auth/utils/helpers";
import PollutantsCard from "@/components/content/dashboard/PollutantsCard";
import airService from "@/utils/air-quality/airService";
import {Session} from "next-auth";
import {Status} from "@/utils/helpers";

export default function AirQualityCards({session}: { session: Session }) {
    const [quality, setQuality] = useState<{
        response?: EnhancedQualityResponse,
        status: Status,
    }>({status: Status.LOADING});

    useEffect(() => {
        (async () => {
            await airService.getQuality<EnhancedQualityResponse>(
                session.tokens.accessToken,
                'Hetmańska 12', '35-045'
            )
                .then(res => {
                    setQuality({response: res, status: Status.READY})
                })
                .catch(err => {
                    setQuality({status: Status.ERROR});
                });
        })();
    }, [session]);

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