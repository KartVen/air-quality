import React, {useState} from "react";
import Card from "@/components/content/utils/Card";
import BriefQualityResponse from "@/utils/api/air-quality/types/briefQualityResponse";
import {formatDateTime} from "@/components/content/dashboard/utils/helpers";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";
import StatusNotReadyBlock from "@/components/shared/StatusNotReadyBlock";
import {Status} from "@/utils/types";
import {Session} from "next-auth";
import Address from "@/utils/api/notification/types/address";
import {BiEdit} from "react-icons/bi";

interface AQIndexCardProps {
    address?: Address,
    setIsChangeAddressMenu: (value: boolean) => void
    session: Session,
    data: {
        response?: BriefQualityResponse;
        status: Status;
    },
}

const USER_NOT_VERIFIED_ERROR_LABEL = 'Zweryfikuj konto, aby wyświetlić szczegóły'

export default function AQIndexCard({
                                        address,
                                        setIsChangeAddressMenu,
                                        session,
                                        data: {response, status}
                                    }: AQIndexCardProps) {

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
                    <>
                        <div className="flex flex-col gap-2 justify-center text-center text-gray-400">
                            <h3 className="font-semibold text-lg"
                                title={`${code} - ${formatDateTime(new Date(dateTime))}`}>
                                <span className="text-blue-400">{aqiDisplay}</span>
                            </h3>
                            <span
                                className="text-sm text-gray-400">{category}. Dominujące zanieczyszczenie: {dominantPollutant}</span>
                        </div>
                        <div
                            className="pt-2 flex justify-center items-center text-sm text-gray-400 font-semibold cursor-pointer"
                            onClick={() => setIsChangeAddressMenu(true)}>
                            <h4>{address?.street}, {address?.postalCode}</h4>&nbsp;<BiEdit/>
                        </div>
                    </>
                ) : <StatusNotReadyBlock status={status}
                                         errorLabel={!session.user.isVerified ? USER_NOT_VERIFIED_ERROR_LABEL : undefined}
                />}
            </CardBody>
        </Card>
    );
}

