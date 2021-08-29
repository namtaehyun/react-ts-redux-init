import React, { useEffect } from 'react';
import qs from 'query-string';
import { useHistory } from 'react-router-dom';
import { apiPostToken, IApiPostTokenResponse } from 'apis/auth';
import AuthService from 'services/authService';
import { useAppDispatch } from 'hooks';
import { setUser } from 'features/commons/authSlice';

interface IOAuthRedirectParams {
    code: string;
    state: string;
    error: string;
}

const CallBackPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        const redirectQueryString = async (queryStr: IOAuthRedirectParams) => {
            const { code, state, error } = queryStr;

                const res: IApiPostTokenResponse = await apiPostToken({
                    code,
                    redirectUri: process.env.REACT_APP_REDIRECT_URL,
                });

                const { access_token, refresh_token, user_id, user_name } = res;

                AuthService.setAccessToken(access_token);
                AuthService.setRefreshToken(refresh_token);

                const { authorities } = AuthService.getProfile();

                dispatch(setUser({ id: user_id, username: user_name, authorities }));

                history.replace(location ? location : '/');
        };

        redirectQueryString(qs.parse(window.location.search));
    }, [history]);

    return <></>;
};

export default CallBackPage;
