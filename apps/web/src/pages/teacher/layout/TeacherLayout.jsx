import { Route, Routes } from "react-router-dom";

import TeacherSidebar from "./TeacherSidebar";
import TeacherBottomNav from "./TeacherBottomNav";

import TeacherDashboard from "../dashboard/TeacherDashboard";
import TeacherCourses from "../courses/TeacherCourses";
import TeacherNotifications from "../notifications/TeacherNotifications"
import TeacherProfile from "../profile/TeacherProfile";

const TeacherLayout = () => {
    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-[#F7F7FF] lg:block">
            {/* Sidebar */}
            <TeacherSidebar />

            {/* Content */}
            <main className="min-h-0 flex-1 overflow-y-auto lg:ml-64 lg:h-dvh lg:overflow-y-auto">
                <Routes>
                    <Route
                        index
                        element={<TeacherDashboard />}
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
                </Routes>
            </main>

            {/* Mobile Bottom Navigation */}
            <TeacherBottomNav />
        </div>
    );
};

export default TeacherLayout;