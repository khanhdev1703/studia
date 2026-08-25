import apiClient from "./apiClient";

const lessonAPI = {
    // GET /lesson/course/:courseId
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

    // POST /lesson/course/:courseId
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

    // DELETE /lesson/:lessonId
    delete: (lessonId) => {
        return apiClient.delete(
            `/lesson/${lessonId}`
        );
    },

    // PUT /lessons/:lessonId/move
    move: (lessonId, direction) => {
        return apiClient.put(
            `/lesson/${lessonId}/move`,
            {
                direction,
            }
        );
    },
};

export default lessonAPI;