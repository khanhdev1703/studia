import { useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "../../../components/common/ScrollToTop";

import StudentSidebar from "./StudentSidebar";

import StudentCoursesPage from "../courses/StudentCoursesPage";
import StudentCourseDetailPage from "../courses/StudentCourseDetailPage";

import ExplorePage from "../explore/ExplorePage";
import ExploreCourseDetailPage from "../explore/ExploreCourseDetailPage";

import ProfilePage from "../profile/StudentProfile";
import StudentBottomNav from "./StudentBottomNav";

const StudentLayout = () => {
    const mainRef = useRef(null);

    return (
        <div className="min-h-dvh bg-[#F8FAFC]">
            <ScrollToTop scrollRef={mainRef} />

            <StudentSidebar />
            <StudentBottomNav />

            <main
                ref={mainRef}
                className={[
                    "min-h-dvh",
                    "overflow-y-auto",
                    "bg-[#F8FAFC]",
                    "pb-16",
                    "lg:ml-64",
                    "lg:h-dvh",
                    "lg:min-h-0",
                    "lg:overflow-y-auto",
                    "lg:pb-0",
                ].join(" ")}
            >
                <Routes>
                    {/* Default */}
                    <Route
                        index
                        element={
                            <Navigate
                                to="courses"
                                replace
                            />
                        }
                    />

                    {/* Học tập */}
                    <Route
                        path="courses"
                        element={<StudentCoursesPage />}
                    />

                    <Route
                        path="courses/:courseId"
                        element={<StudentCourseDetailPage />}
                    />

                    {/* Khám phá */}
                    <Route
                        path="explore/:courseId"
                        element={<ExploreCourseDetailPage />}
                    />
                    <Route
                        path="explore"
                        element={<ExplorePage />}
                    />



                    {/* Tài khoản */}
                    <Route
                        path="profile/*"
                        element={<ProfilePage />}
                    />

                    {/* Fallback */}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="courses"
                                replace
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
};

export default StudentLayout;