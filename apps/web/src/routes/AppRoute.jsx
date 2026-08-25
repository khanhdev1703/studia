import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import RoleRoute from "./RoleRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LandingPage from "../pages/LandingPage"
import TeacherLayout from "../pages/teacher/layout/TeacherLayout";
import StudentLayout from "../pages/student/layout/StudentLayout";

const AppRoute = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                element={
                    <GuestRoute redirectTo="/student" />
                }
            >
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route
                    element={
                        <RoleRoute
                            allowedRoles={["STUDENT"]}
                        />
                    }
                >
                    <Route
                        path="/student/*"
                        element={<StudentLayout />}
                    />
                </Route>

                <Route
                    element={
                        <RoleRoute
                            allowedRoles={["TEACHER"]}
                        />
                    }
                >
                    <Route
                        path="/teacher/*"
                        element={<TeacherLayout />}
                    />
                </Route>

                <Route
                    element={
                        <RoleRoute
                            allowedRoles={["ADMIN"]}
                        />
                    }
                >
                    <Route
                        path="/admin/*"
                        element={<div>AdminPage</div>}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoute;