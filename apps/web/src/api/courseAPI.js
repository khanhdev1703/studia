import apiClient from "./apiClient";

const courseAPI = {
    searchCourse(params = {}) {
        return apiClient.get("/course/search", {
            params,
        })
    },
    getTeacherCourses() {
        return apiClient.get("/course");
    },

    getCourseById(courseId) {
        return apiClient.get(`/course/${courseId}`);
    },

    getStudentCourseDetail(courseId) {
        return apiClient.get(`/course/published/${courseId}`);
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