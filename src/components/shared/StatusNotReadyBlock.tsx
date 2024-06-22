import React from "react";
import {Status} from "@/utils/types";

export default function StatusNotReadyBlock({status, errorLabel}: { status: Status, errorLabel?: String }) {
    return <div className="text-red-600 text-center">
        {status === Status.LOADING ? 'Wczytywanie...' : (errorLabel ?? 'Błąd pobierania! Przepraszamy za problemy')}
    </div>;
}