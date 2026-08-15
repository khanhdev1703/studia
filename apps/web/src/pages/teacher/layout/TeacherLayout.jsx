import { Route, Routes } from "react-router-dom";

import TeacherSidebar from "./TeacherSidebar";
import TeacherHeader from "./TeacherHeader";
import TeacherBottomNav from "./TeacherBottomNav";

import TeacherDashboard from "../dashboard/TeacherDashboard";
import TeacherCourses from "../courses/TeacherCourses";
import TeacherStudents from "../students/TeacherStudents";
import TeacherProfile from "../profile/TeacherProfile";

const TeacherLayout = () => {
    return (
        <div className="min-h-screen bg-[#F7F7FF]">
            <TeacherSidebar />

            <div className="min-h-screen lg:pl-64">
                <TeacherHeader />

                <main className="px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-8">
                    <div className="mx-auto w-full max-w-7xl">
                        <Routes>
                            <Route
                                index
                                element={
                                    <TeacherDashboard />
                                }
                            />

                            <Route
                                path="courses/*"
                                element={
                                    <TeacherCourses />
                                }
                            />

                            <Route
                                path="students"
                                element={
                                    <TeacherStudents />
                                }
                            />

                            <Route
                                path="profile"
                                element={
                                    <TeacherProfile />
                                }
                            />
                        </Routes>
                    </div>
                </main>
            </div>

            <TeacherBottomNav />
        </div>
    );
};

export default TeacherLayout;