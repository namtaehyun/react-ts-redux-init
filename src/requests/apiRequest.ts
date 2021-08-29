import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthService from 'services/authService';

const CancelToken = axios.CancelToken;

const apiRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

apiRequest.interceptors.request.use(
    async (config: AxiosRequestConfig | any) => {
        try {
            const accessToken = AuthService.getAccessToken();
            const refreshToken = AuthService.getRefreshToken();

            // access token 만료일 경우
            if (AuthService.isTokenExpired(accessToken ? accessToken : '')) {
                //refresh token 미 만료일 경우
                if (!AuthService.isTokenExpired(refreshToken ? refreshToken : '') && refreshToken) {
                    AuthService.refreshToken({ refreshToken }); // 재발행
                } else {
                    // 로그아웃 처리
                    AuthService.removeToken();
                    return {
                        ...config,
                        cancelToken: new CancelToken((cancel: any) => cancel('요청 취소')),
                    };
                }
            }
            config.headers['Authorization'] = 'accessToken' ? `Bearer ${accessToken}` : '';

            return config;
        } catch (e) {
            // 로그아웃 처리
            AuthService.removeToken();
        }
    },
    (error) => Promise.reject(error),
);

apiRequest.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        const { result, message } = response.data;

        if (result) {
            return response.data;
        } else {
            // snackbar.error(message);
            const error = new Error(message);
            throw error;
        }
    },
    (error: AxiosError<any>) => {
        // snackbar.error('에러가 발생했습니다. 관리자에게 문의해주세요.');

        return Promise.reject(error);
    },
);

export default apiRequest;
