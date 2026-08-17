import { Route, Routes } from "react-router-dom";

import CoursesPage from "./pages/CoursesPage";
import CourseCreatePage from "./pages/CourseCreatePage";
import CourseDetailPage from "./detail/CourseDetailPage";
import CourseOverviewPage from "./detail/overview/CourseOverviewPage";
import CourseLessonsPage from "./detail/lessons/CourseLessonsPage";
import CourseStudentsPage from "./detail/students/CourseStudentsPage";

const TeacherCourses = () => {
    return (
        <Routes>
            <Route
                index
                element={<CoursesPage />}
            />

            <Route
                path="create"
                element={<CourseCreatePage />}
            />

            <Route
                path=":courseId"
                element={<CourseDetailPage />}
            >
                {/* /teach/courses/:courseId */}
                <Route
                    index
                    element={<CourseOverviewPage />}
                />

                {/* /teach/courses/:courseId/lessons */}
                <Route
                    path="lessons/*"
                    element={<CourseLessonsPage />}
                />

                {/* /teach/courses/:courseId/students */}
                <Route
                    path="students"
                    element={<CourseStudentsPage />}
                />
            </Route>
        </Routes>
    );
};

export default TeacherCourses;