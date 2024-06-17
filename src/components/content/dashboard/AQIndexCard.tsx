import React from "react";
import Card from "@/components/content/utils/Card";
import BriefQualityResponse from "@/utils/air-quality/models/briefQualityResponse";
import {formatDateTime} from "@/components/content/dashboard/utils/helpers";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";
import {Status} from "@/utils/helpers";
import StatusNotReadyBlock from "@/components/shared/StatusNotReadyBlock";

interface AQIndexCardProps {
    data: {
        response?: BriefQualityResponse;
        status: Status;
    }
}

export default function AQIndexCard({data: {response, status}}: AQIndexCardProps) {

    if (status === Status.READY && !response) return null;

    const {
        dateTime,
        indexes: [
            {
                code, displayName, category, dominantPollutant, aqiDisplay
            }
        ]
    } = response || {dateTime: '', indexes: [{}]};

    return (
        <Card>
            <CardHeader value={status === Status.READY ? displayName ?? '' : ''}/>
            <CardBody>
                {status === Status.READY ? (
                    <div className="flex flex-col gap-2 justify-center font-semibold text-center">
                        <h3 className="font-semibold text-lg" title={`${code} - ${formatDateTime(new Date(dateTime))}`}>
                            <span className="text-blue-400">{aqiDisplay}</span>
                        </h3>
                        <span
                            className="text-sm text-gray-400">{category}. Dominujące zanieczyszczenie: {dominantPollutant}</span>
                    </div>
                ) : <StatusNotReadyBlock status={status}/>}
            </CardBody>
        </Card>
    );
}

