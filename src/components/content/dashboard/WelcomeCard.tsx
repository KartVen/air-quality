import {WELCOME_SEQUENCE} from "@/components/content/dashboard/utils/constants";
import Card from "@/components/content/dashboard/Card";
import {useSession} from "next-auth/react";

export default function WelcomeCard() {
    const {data: session} = useSession();

    return session && (
        <Card>
            <div className="h-full flex flex-col gap-2 justify-center items-center font-semibold">
                <span className="text-gray-400 text-sm">{WELCOME_SEQUENCE}</span>
                <h2
                    className={`text-3xl ${!session.user.isVerified ? 'text-red-500' : ''}`}
                    title={!session.user.isVerified ? 'Użytkownik niezweryfikowany' : ''}
                >
                    {session.user.username}
                </h2>
            </div>
        </Card>
    );
}