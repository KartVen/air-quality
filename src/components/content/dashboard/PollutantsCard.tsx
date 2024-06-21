import React, {useState, useEffect} from "react";
import Card from "@/components/content/utils/Card";
import {mapUnit} from "@/utils/air-quality/methods/mapUnit";
import {clsx} from "clsx";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";
import EnhancedQualityResponse from "@/utils/air-quality/types/enhancedQualityResponse";
import StatusNotReadyBlock from "@/components/shared/StatusNotReadyBlock";
import {Status} from "@/utils/types";

interface PollutantsCardProps {
    data: {
        response?: EnhancedQualityResponse | undefined;
        status: Status
    }
}

export default function PollutantsCard({data: {response, status}}: PollutantsCardProps) {
    const [selectedCode, setSelectedCode] = useState<string | undefined>();

    const handlePollutantClick = (code: string) => {
        !(selectedCode === code) && setSelectedCode(code);
    };

    if (status === Status.READY && !response) return null;

    return (
        <Card>
            <CardHeader value={"Szczegóły Zanieczyszczeń"}/>
            <CardBody>
                {status === Status.READY ? (
                    <>
                        <div className="w-full flex flex-row gap-0.5">
                            {response && response.pollutants?.map(({code, displayName}) => (
                                <div className={clsx(
                                    "flex-1 cursor-pointer hover:bg-primary-hover text-center",
                                    selectedCode === code && "bg-primary-hover"
                                )} key={code}
                                     onClick={() => handlePollutantClick(code)}>
                                    {displayName}
                                </div>
                            ))}
                        </div>
                        {
                            response && response.pollutants?.filter(p => p.code === selectedCode)
                                .map(({code, concentration, additionalInfo}) => (
                                    <div className="flex flex-col gap-2 justify-center pt-2 font-semibold text-center"
                                         key={code}
                                    >
                                        <h3 className="font-semibold text-lg">
                                                <span className="text-blue-400">
                                                    {concentration.value} {mapUnit(concentration.units)}
                                                </span>
                                        </h3>
                                        <div className="flex flex-col text-sm text-gray-400 font-semibold">
                                            <span>{additionalInfo.sources}</span>
                                            <span>{additionalInfo.effects}</span>
                                        </div>
                                    </div>
                                ))
                        }
                    </>
                ) : <StatusNotReadyBlock status={status}/>}
            </CardBody>
        </Card>
    );
}