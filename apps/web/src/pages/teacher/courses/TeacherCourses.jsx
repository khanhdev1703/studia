// courses/TeacherCourses.jsx

import { Route, Routes } from "react-router-dom";

import CourseList from "./CourseList";
import CreateCourse from "./CreateCourse";
import CourseDetail from "./CourseDetail";
import EditCourse from "./EditCourse";

const TeacherCourses = () => {
    return (
        <Routes>
            <Route
                index
                element={<CourseList />}
            />

            <Route
                path="create"
                element={<CreateCourse />}
            />

            <Route
                path=":courseId"
                element={<CourseDetail />}
            />

            <Route
                path=":courseId/edit"
                element={<EditCourse />}
            />
        </Routes>
    );
};

export default TeacherCourses;