import { Routes, Route } from "react-router-dom";

import CourseLessonsList from "./CourseLessonsList";
import LessonCreatePage from "./LessonCreatePage";
import LessonDetailPage from "./LessonDetailPage";

const CourseLessonsPage = () => {
    return (
        <Routes>
            {/* /lessons */}
            <Route
                index
                element={<CourseLessonsList />}
            />

            {/* /lessons/create */}
            <Route
                path="create"
                element={<LessonCreatePage />}
            />

            {/* /lessons/:lessonId */}
            <Route
                path=":lessonId"
                element={<LessonDetailPage />}
            />
        </Routes>
    );
};

export default CourseLessonsPage;
