import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { DashBoard } from 'features';
import AuthLayout from 'components/layouts/authLayout';
import AuthService from 'services/authService';
import CallBackPage from 'utiles/callBackPage';
import { useAppDispatch } from 'hooks';
import { setUser } from 'features/commons/authSlice';
import moment from 'moment';

const AuthRoute = ({ component: Component, location, ...rest }: RouteProps) => {
    const dispatch = useAppDispatch();

    if (!Component) return null;

    const accessToken = AuthService.getAccessToken();
    const refreshToken = AuthService.getRefreshToken();

    // access token 만료일 경우
    if (AuthService.isTokenExpired(accessToken ? accessToken : '')) {
        //refresh token 미 만료일 경우
        if (!AuthService.isTokenExpired(refreshToken ? refreshToken : '') && refreshToken) {
            AuthService.refreshToken({ refreshToken }); // 재발행
        } else {
            alert('로그인이 만료되었습니다.');
            // localStorage.setItem('location', location ? location.pathname : '/');        // 기존 경로 저장
            AuthService.removeToken();
        }
    }

    useEffect(() => {
        if (accessToken) {
            const { user_id, user_name, authorities } = AuthService.getProfile();
            // 1. 첫 로딩 시, localStorage에서 JWT을 Decode

            // 2. User 정보를 Redux Store에 저장 함.
            dispatch(
                setUser({
                    id: user_id,
                    username: user_name,
                    authorities,
                }),
            );
        }
    }, [accessToken]);

    // access token 유효
    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    <AuthLayout>
                        <Component {...props} />
                    </AuthLayout>
                );
            }}
        />
    );
};

const Routes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <AuthRoute path="/dashboard" component={DashBoard} />
                <Route path="/callback" component={CallBackPage} />
                <Redirect path="/" to="/dashboard" />
            </Switch>
        </Router>
    );
};

export default Routes;
