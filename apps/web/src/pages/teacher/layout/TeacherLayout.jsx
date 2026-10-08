import { Navigate, Route, Routes } from "react-router-dom";

import TeacherSidebar from "./TeacherSidebar";

import TeacherCourses from "../courses/TeacherCourses";
import TeacherNotifications from "../notifications/TeacherNotifications";
import TeacherProfile from "../profile/TeacherProfile";

const TeacherLayout = () => {
    return (
        <div className="min-h-dvh bg-[#F7F7FF]">
            <TeacherSidebar />

            <main
                className={[
                    // Mobile
                    "min-h-dvh",

                    // Desktop
                    "lg:ml-64",
                    "lg:pt-0",
                ].join(" ")}
            >
                <Routes>
                    <Route
                        index
                        element={<Navigate to="courses" replace />}
                    />

                    <Route
                        path="courses/*"
                        element={<TeacherCourses />}
                    />

                    <Route
                        path="notifications"
                        element={<TeacherNotifications />}
                    />

                    <Route
                        path="profile"
                        element={<TeacherProfile />}
                    />

                    <Route
                        path="*"
                        element={<Navigate to="courses" replace />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default TeacherLayout;