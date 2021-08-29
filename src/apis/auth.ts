import authRequest from 'requests/authRequest';

interface IApiPostTokenProps {
    code: string;
    redirectUri: string;
}

export const apiPostToken = async ({ code, redirectUri }: IApiPostTokenProps): Promise<any> => {
    return await authRequest({
        url: '/',
        method: 'POST',
        params: {
            code,
            redirectUri,
        },
    });
};

export interface IApiPostRefreshTokenProps {
    refreshToken: string;
}

export const apiPostRefreshToken = async ({ refreshToken }: IApiPostRefreshTokenProps): Promise<any> => {
    return await authRequest({
        url: '',
        method: 'POST',
        params: {
            refreshToken,
        },
    });
};
