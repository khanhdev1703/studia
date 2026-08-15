import apiClient from "./apiClient";

const courseAPI = {
    getTeacherCourses() {
        return apiClient.get("/course");
    },

    getCourseById(courseId) {
        return apiClient.get(`/course/${courseId}`);
    },

    createCourse(data) {
        return apiClient.post("/course", data);
    },

    updateCourse(courseId, data) {
        return apiClient.put(
            `/course/${courseId}`,
            data
        );
    },

    deleteCourse(courseId) {
        return apiClient.delete(
            `/course/${courseId}`
        );
    },
};

export default courseAPI;