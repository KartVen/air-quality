import {WELCOME_SEQUENCE} from "@/components/content/dashboard/utils/constants";
import Card from "@/components/content/utils/Card";
import {useSession} from "next-auth/react";
import {Session} from "next-auth";

export default function WelcomeCard() {
    const {data: session} = useSession();

    const getVerifiedTitle = (session: Session) => !session.user.isVerified
        ? 'Użytkownik niezweryfikowany' : '';

    return <Card>
        <div className="h-full flex flex-col gap-2 justify-center items-center font-semibold">
            <span className="text-gray-400 text-sm">{WELCOME_SEQUENCE}</span>
            {session && (
                <h2 className={`text-3xl ${!session.user.isVerified ? 'text-red-500' : ''}`}
                    title={getVerifiedTitle(session)}>
                    {session.user.username}
                </h2>
            )}
        </div>
    </Card>;
}