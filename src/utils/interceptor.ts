import axios from "axios";
import ApiError, {
    BadRequestApiError,
    ForbiddenApiError,
    InternalErrorApiError,
    UnauthorizedApiError
} from "@/utils/apiError";

const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Accept': 'application/json',
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
        }
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