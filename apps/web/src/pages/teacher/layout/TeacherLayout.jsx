import { Route, Routes } from "react-router-dom";

import TeacherSidebar from "./TeacherSidebar";
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
            </div>

            <TeacherBottomNav />
        </div>
    );
};

export default TeacherLayout;