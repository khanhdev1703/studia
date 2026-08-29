import {
    Routes, Route
} from "react-router-dom";

import LessonCreatePage from "./LessonCreatePage";
import LessonDetailPage from "./LessonDetailPage";

const LessonLayout = () => {

    return (
        <Routes>
            <Route path="create" element={<LessonCreatePage />} />
            <Route path=":lessonId" element={<LessonDetailPage />} />
        </Routes>
    );
};

export default LessonLayout;