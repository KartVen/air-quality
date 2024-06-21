import {Session} from "next-auth";
import {AxiosHeaderValue} from "axios";

export default abstract class ApiService {
    protected getAuthorizationHeader(accessToken: string) {
        return {Authorization: `Bearer ${accessToken}`};
    }

    protected withAuthorization(session: Session): { headers: { [key: string]: AxiosHeaderValue } } {
        return {
            headers: this.getAuthorizationHeader(session.tokens.accessToken),
        };
    }
}