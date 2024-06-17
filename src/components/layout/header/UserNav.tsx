import React from "react";
import {FaPlus} from "react-icons/fa6";
import usePersistentSession from "@/utils/auth/usePersistentSession";

export default function UserNav() {
    const {session} = usePersistentSession();

    if (session) {
        return (
            <div className="flex gap-5 font-semibold">
                    <span className="flex items-center text-base">
                        {session.user.username}
                    </span>
            </div>
        );
    }
    return null;
}
