import axiosApi from "@/utils/api/axiosApi";
import {concatBearer} from "@/utils/methods";
import ApiService from "@/utils/api/apiService";
import {Session} from "next-auth";

interface AirEndpoints {
    getQuality<T>(session: Session, street: string, postalCode: string): Promise<T>;
}

class AirService extends ApiService implements AirEndpoints {
    async getQuality<T>(session: Session, street: string, postalCode: string): Promise<T> {
        return await axiosApi.post<T>("/getAirQuality/", {street, postalCode}, this.withAuthorization(session))
            .then(res => res.data);
    }
}

const airService = new AirService();
export default airService;