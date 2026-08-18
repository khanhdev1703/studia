import { Route, Routes } from "react-router-dom";

import CoursesPage from "./pages/CoursesPage";
import CourseCreatePage from "./pages/CourseCreatePage";
import CourseRoute from "./detail/CourseRoute";

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
                path=":courseId/*"
                element={<CourseRoute />}
            />
        </Routes>
    );
};

export default TeacherCourses;