import { useRef } from "react";

import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import ScrollToTop from "../../../components/common/ScrollToTop";

import StudentSidebar from "./StudentSidebar";
import StudentBottomNav from "./StudentBottomNav";

import StudentDashboard from "../dashboard/StudentDashboard";
import ProfilePage from "../profile/StudentProfile";

import ExplorePage from "../explore/ExplorePage";
import ExploreCoursePage from "../explore/ExploreCoursePage";
import ExploreCourseDetailPage from "../explore/ExploreCourseDetailPage";
import ExploreTeacherPage from "../explore/ExploreTeacherPage";

import StudentCoursesPage from "../courses/StudentCoursesPage";
import StudentCourseDetailPage from "../courses/StudentCourseDetailPage.jsx";

const StudentLayout = () => {
    const mainRef = useRef(null);

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-[#F7F7FF] lg:block">
            <ScrollToTop scrollRef={mainRef} />

            {/* Desktop Sidebar */}
            <StudentSidebar />

            {/* Main Content */}
            <main
                ref={mainRef}
                className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                    lg:ml-64
                    lg:h-dvh
                    lg:overflow-y-auto
                "
            >
                <Routes>
                    {/* ==========================================
                        Dashboard
                    ========================================== */}
                    <Route
                        index
                        element={<StudentDashboard />}
                    />

                    {/* ==========================================
                        Học tập
                        
                        /student/courses
                        /student/courses/:courseId
                    ========================================== */}
                    <Route
                        path="courses"
                        element={<StudentCoursesPage />}
                    />

                    <Route
                        path="courses/:courseId"
                        element={<StudentCourseDetailPage />}
                    />

                    {/* ==========================================
                        Khám phá
                        
                        /student/explore
                        /student/explore/courses
                        /student/explore/courses/:courseId
                        /student/explore/teachers
                    ========================================== */}
                    <Route
                        path="explore"
                        element={<ExplorePage />}
                    >
                        <Route
                            index
                            element={
                                <Navigate
                                    to="courses"
                                    replace
                                />
                            }
                        />

                        <Route
                            path="courses/:courseId"
                            element={
                                <ExploreCourseDetailPage />
                            }
                        />

                        <Route
                            path="courses"
                            element={<ExploreCoursePage />}
                        />



                        <Route
                            path="teachers"
                            element={<ExploreTeacherPage />}
                        />
                    </Route>

                    {/* ==========================================
                        Profile
                        
                        /student/profile
                    ========================================== */}
                    <Route
                        path="profile/*"
                        element={<ProfilePage />}
                    />
                </Routes>
            </main>

            {/* Mobile Bottom Navigation */}
            <StudentBottomNav />
        </div>
    );
};

export default StudentLayout;