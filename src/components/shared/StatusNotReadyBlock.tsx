import React from "react";
import {Status} from "@/utils/helpers";

export default function StatusNotReadyBlock({status}: { status: Status }) {
    return <div className="text-red-600 text-center">
        {status === Status.LOADING ? 'Wczytywanie...' : 'Błąd pobierania z API'}
    </div>;
}