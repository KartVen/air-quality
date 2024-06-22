import axios from "axios";
import ApiError, {
    BadRequestApiError,
    ForbiddenApiError,
    InternalErrorApiError, ServiceUnavailableApiError,
    UnauthorizedApiError
} from "@/utils/api/apiError";

const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    },
})

axiosApi.interceptors.request.use(
    config => config,
    error => Promise.reject(error));

axiosApi.interceptors.response.use(
    response => response,
    error => {
        let status: number | undefined = undefined;
        let data: string | undefined = undefined
        if (error.response) {
            status = error.response.status;
            data = error.response.data;
        } else if (error.code == "ERR_NETWORK")
            status = 503;
        let apiError: ApiError;
        switch (status) {
            case 400:
                apiError = new BadRequestApiError(data);
                break;
            case 401:
                apiError = new UnauthorizedApiError(data);
                break;
            case 403:
                apiError = new ForbiddenApiError(data);
                break;
            case 500:
                apiError = new InternalErrorApiError(data);
                break;
            case 503:
                apiError = new ServiceUnavailableApiError();
                break;
            default:
                apiError = {
                    getCode: () => -1,
                    getMessage: () => "Undefined error",
                    getData: () => undefined,
                };
        }
        return Promise.reject<ApiError>(apiError);
    }
);

export default axiosApi;