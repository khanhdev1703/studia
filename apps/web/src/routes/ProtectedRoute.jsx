import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../stores/authStore";
import authService from "../services/authService";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
    const accessToken = useAuthStore(
        (state) => state.accessToken
    );

    const user = useAuthStore(
        (state) => state.user
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                if (!user) {
                    await authService.getMe();
                }
            } catch (error) {
                console.log("Protected Error:", error);
                useAuthStore.getState().logout();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [accessToken, user]);

    if (!accessToken) {
        return <Navigate to={redirectTo} replace />;
    }

    if (loading) {
        return <div>Đang kiểm tra đăng nhập...</div>;
    }

    return <Outlet />;
};

export default ProtectedRoute;