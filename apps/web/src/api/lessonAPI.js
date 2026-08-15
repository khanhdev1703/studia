import apiClient from "./apiClient";

const lessonAPI = {
    // GET /course/:courseId/lessons
    getLessonsByCourse: (courseId) => {
        return apiClient.get(
            `/course/${courseId}/lessons`
        );
    },

    // GET /lessons/:lessonId
    getById: (lessonId) => {
        return apiClient.get(
            `/lessons/${lessonId}`
        );
    },

    // POST /lessons/course/:courseId
    create: (courseId, data) => {
        return apiClient.post(
            `/lessons/course/${courseId}`,
            data
        );
    },

    // PUT /lessons/:lessonId
    update: (lessonId, data) => {
        return apiClient.put(
            `/lessons/${lessonId}`,
            data
        );
    },

    // DELETE /lessons/:lessonId
    delete: (lessonId) => {
        return apiClient.delete(
            `/lessons/${lessonId}`
        );
    },

    // PATCH /lessons/course/:courseId/reorder
    reorder: (courseId, lessons) => {
        return apiClient.patch(
            `/lessons/course/${courseId}/reorder`,
            { lessons }
        );
    },
};

export default lessonAPI;