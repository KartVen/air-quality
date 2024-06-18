import axiosApi from "@/utils/interceptor";
import {concatBearer} from "@/utils/helpers";

interface AirService {
    getQuality<T>(bearer: string, street: string, postalCode: string): Promise<T>;
}

const airService: AirService = {
    async getQuality<T>(bearer: string, street: string, postalCode: string): Promise<T> {
        const body = {street, postalCode};
        return await axiosApi.post<T>("/getAirQuality/", body, {
            headers: {Authorization: concatBearer(bearer)}
        })
            .then(res => res.data);
    }
}

export default airService;