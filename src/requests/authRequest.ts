import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const authRequest = axios.create({
    baseURL: process.env.REACT_APP_OAUTH_URL,
});

authRequest.interceptors.request.use(
    async (config: AxiosRequestConfig | any) => {
        try {
            config.auth = {
                username: process.env.REACT_APP_CLIENT_ID,
                password: process.env.REACT_APP_CLIENT_SECRET,
            };

            return config;
        } catch (e) {
            console.log(e);
        }
    },
    (error) => Promise.reject(error),
);

authRequest.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        return response.data;
    },
    (error: AxiosError<any>) => {
        return Promise.reject(error);
    },
);

export default authRequest;
