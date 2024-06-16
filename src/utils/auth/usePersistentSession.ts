import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {Session} from "next-auth";

interface PersistentSession {
    session: Session | null,
    status: 'authenticated' | 'unauthenticated' | 'loading',
}

function usePersistentSession() {
    const {data: session, status} = useSession();
    const [persistentSession, setPersistentSession] = useState<PersistentSession>({
        session: session,
        status: status,
    });

    useEffect(() => {
        setPersistentSession({session, status});
    }, [session, status]);

    return persistentSession;
}

export default usePersistentSession;