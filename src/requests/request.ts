import axios, { AxiosError, AxiosResponse } from 'axios';

type ResponseType = {
    success: boolean;
    data: any;
    message: string;
};

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

request.interceptors.response.use(
    (response: AxiosResponse<ResponseType>) => {
        const { success, message, data } = response.data;

        if (success) {
            return data;
        } else {
            // snackbar.error(message);
            const error = new Error();
            throw error;
        }
    },
    (error: AxiosError<any>) => {
        // const { message } = error.response.data;

        // snackbar.error(message);
        return Promise.reject(error);
    },
);

export default request;
