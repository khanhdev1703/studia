import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const GuestRoute = ({ children, redirectTo = '/' }) => {
    const token = useAuthStore((state) => state.accessToken);
    const isAuthenticated = Boolean(token);

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children || <Outlet />;
};

export default GuestRoute;
