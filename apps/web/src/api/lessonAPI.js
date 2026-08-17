import apiClient from "./apiClient";

const lessonAPI = {
    // GET /course/:courseId/lessons
    getLessonsByCourse: (courseId) => {
        return apiClient.get(
            `/lesson/course/${courseId}`
        );
    },

    // GET /lessons/:lessonId
    getById: (lessonId) => {
        return apiClient.get(
            `/lessons/${lessonId}`
        );
    },

    // POST /lessons/course/:courseId
    create: async (
        courseId,
        data,
        onProgress
    ) => {
        return apiClient.post(
            `/lesson/course/${courseId}`,
            data,
            {
                timeout: 0,

                onUploadProgress: (event) => {
                    if (!event.total) {
                        return;
                    }

                    const progress = Math.round(
                        (event.loaded * 100) /
                        event.total
                    );

                    onProgress?.(progress);
                },
            }
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
            `/lesson/${lessonId}`
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