import { Navigate, Route, Routes } from "react-router-dom";

import TeacherSidebar from "./TeacherSidebar";

import TeacherCourses from "../courses/TeacherCourses";
import TeacherNotifications from "../notifications/TeacherNotifications";
import TeacherProfile from "../profile/TeacherProfile";

const TeacherLayout = () => {
    return (
        <div className="min-h-dvh bg-[#F7F7FF]">
            {/* Desktop Sidebar + Mobile Header/Drawer */}
            <TeacherSidebar />

            {/* Main Content */}
            <main
                className={[
                    // Mobile
                    "min-h-dvh",
                    "overflow-y-auto",
                    "pt-16",

                    // Desktop
                    "lg:ml-64",
                    "lg:h-dvh",
                    "lg:min-h-0",
                    "lg:overflow-y-auto",
                    "lg:pt-0",
                ].join(" ")}
            >
                <Routes>
                    {/* /teacher */}
                    <Route
                        index
                        element={<Navigate to="courses" replace />}
                    />

                    {/* /teacher/courses/... */}
                    <Route
                        path="courses/*"
                        element={<TeacherCourses />}
                    />

                    {/* /teacher/notifications */}
                    <Route
                        path="notifications"
                        element={<TeacherNotifications />}
                    />

                    {/* /teacher/profile */}
                    <Route
                        path="profile"
                        element={<TeacherProfile />}
                    />

                    {/* Route không tồn tại */}
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