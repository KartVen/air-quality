"use client";
import {FormFieldData} from "@/components/shared/form/FormInputField";
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import authService from "@/utils/api/auth/authService";

const VERIFY_SUCCESS = "Wysłano!";

interface FormFields {
    username: FormFieldData;
}

export default function VerifyAccountEmail() {
    const {data: session, update: updateSession} = useSession();
    const [isProcessSuccess, setIsProcessSuccess] = useState<boolean>(false);

    const onCLick = () => {
        session && authService.refreshVerify(session)
            .then(() => setIsProcessSuccess(true))
            .catch(err => setIsProcessSuccess(false));
    };

    return <div>
        <div className="w-full h-full flex justify-center items-center pt-2">
            <button className="w-1/2 p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold" onClick={onCLick}>
                Wyślij ponownie
            </button>
        </div>
        {isProcessSuccess && <div className="w-full pt-2 text-green-500 text-center">{VERIFY_SUCCESS}</div>}
    </div>;
}