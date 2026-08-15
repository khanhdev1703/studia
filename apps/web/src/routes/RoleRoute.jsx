import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

// src/constants/roleRoutes.js

const ROLE_ROUTES = {
    STUDENT: "/student",
    TEACHER: "/teacher",
    ADMIN: "/admin",
};

const getRoleRoute = (role) => {
    return ROLE_ROUTES[role] || "/login";
};

const RoleRoute = ({ allowedRoles }) => {
    const user = useAuthStore(
        (state) => state.user
    );

    if (!user) {
        return <Navigate
            to={"/login"}
            replace
        />
    }

    if (!allowedRoles.includes(user.role)) {
        return (
            <Navigate
                to={getRoleRoute(user.role)}
                replace
            />
        );
    }

    return <Outlet />;
};

export default RoleRoute;