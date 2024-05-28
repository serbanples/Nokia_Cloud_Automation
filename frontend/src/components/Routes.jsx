import { Outlet, Navigate } from 'react-router-dom';
import AuthService from '../api/authService'

export const RootRoutes = () => {
    const access_token = AuthService.getAccessToken();

    return (
        access_token ? <Outlet /> : <Navigate to="/auth/login" />
    );
};

export const AuthRoutes = () => {
    const access_token = AuthService.getAccessToken();

    return (
        access_token ? <Navigate to="/" /> : <Outlet />
    )
}
