import decode from 'jwt-decode';
import { apiPostRefreshToken, IApiPostRefreshTokenProps } from 'apis/auth';

export const storage = {
    accessToken: 'AT',
    refreshToken: 'RT',
};

interface IDecodedToken {
    username: string;
    exp: number;
}

const setAccessToken = (token: string): void => {
    localStorage.setItem(storage.accessToken, token);
};

const setRefreshToken = (token: string): void => {
    localStorage.setItem(storage.refreshToken, token);
};

const getAccessToken = (): string | null => {
    return localStorage.getItem(storage.accessToken);
};

const getRefreshToken = (): string | null => {
    return localStorage.getItem(storage.refreshToken);
};

const getProfile = (): any | null => {
    const token = getAccessToken();

    return token ? decode(token) : null;
};

const removeToken = (): void => {
    localStorage.clear();
};

const refreshToken = async ({ refreshToken }: IApiPostRefreshTokenProps): Promise<void> => {
    try {
        const res = await apiPostRefreshToken({
            refreshToken,
        });

        const { access_token, refresh_token } = res;

        setAccessToken(access_token);
        setRefreshToken(refresh_token);
    } catch (e) {
        removeToken();
    }
};

// 토큰 만료 true
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: IDecodedToken = decode(token);

        if (decoded.exp < Date.now() / 1000) {
            return true;
        } else return false;
    } catch (err) {
        return true;
    }
};

const AuthService = {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    refreshToken,
    removeToken,
    isTokenExpired,
    getProfile,
};

export default AuthService;
