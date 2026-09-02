import { Route, Routes } from "react-router-dom"
import CourseDetailPage from "./CourseDetailPage";

import LessonLayout from "./lesson/LessonLayout"
import CourseOverviewPage from "./overview/CourseOverviewPage"
import CourseLessonsPage from "./lessons/CourseLessonsPage";
import CourseEnrollmentsPage from "./enrollments/CourseEnrollmentsPage";

const CourseRoute = () => {
    return (
        <Routes>
            {/* /teach/courses/:courseId */}
            <Route path="*" element={<CourseDetailPage />}>
                <Route
                    index
                    element={<CourseOverviewPage />}
                />

                {/* /teach/courses/:courseId/lessons */}
                <Route
                    path="lessons"
                    element={<CourseLessonsPage />}
                />

                {/* /teach/courses/:courseId/students */}
                <Route
                    path="students"
                    element={<CourseEnrollmentsPage />}
                />
            </Route>
            <Route path="/lessons/*" element={<LessonLayout />} />
        </Routes>
    )
}

export default CourseRoute;