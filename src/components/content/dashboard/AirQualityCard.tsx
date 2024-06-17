"use client";
import React, {useState, useEffect} from "react";
import usePersistentSession from "@/utils/auth/usePersistentSession";
import Card from "@/components/content/dashboard/Card";
import BriefQualityResponse from "@/utils/air-quality/models/briefQualityResponse";
import airService from "@/utils/air-quality/airService";

export default function AirQualityCard() {
    const [state, setState] = useState<{
        brief?: BriefQualityResponse,
        error?: boolean,
    }>({});
    const {session} = usePersistentSession();

    useEffect(() => {
        (async () => {
            if (!session) return null;
            console.debug(session.tokens.accessToken);
            await airService.getQuality<BriefQualityResponse>(
                session.tokens.accessToken,
                'Hetmańska 12', '35-045'
            )
                .then(brief => setState({brief}))
                .catch(err => {
                    console.log('err', err);
                    setState({error: true});
                });
        })();
    }, [session]);

    /*if (state.error && session) return (
        <Card>
            <div className="flex flex-col justify-center font-semibold p-4">Błąd pobierania...</div>
        </Card>
    );*/

    if (!state.brief && session) return (
        <Card>
            <div className="flex flex-col justify-center font-semibold p-4">Ładowanie...</div>
        </Card>
    );

    return (
        <Card>
            <div className="flex flex-col justify-center font-semibold p-4">
            </div>
        </Card>
    );
}