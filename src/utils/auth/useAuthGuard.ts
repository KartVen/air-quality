import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const SIGN_IN_PATH = '/sign-in';

export const useAuthGuard = () => {
    const {status} = useSession();

    const isPermitted = (): boolean => {
        switch (status) {
            case 'authenticated':
                return true;
            case 'unauthenticated':
                break;
            case 'loading':
                return false;
        }
        redirect(SIGN_IN_PATH);
    };

    return {
        isPermitted
    };
};