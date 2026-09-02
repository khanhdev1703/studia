import apiClient from "./apiClient";

const lessonAPI = {
    // ==========================================
    // Get lessons by course
    // GET /lesson/course/:courseId
    // ==========================================

    getLessonsByCourse: (courseId) => {
        return apiClient.get(
            `/lessons/course/${courseId}`
        );
    },

    // ==========================================
    // Get lesson by ID
    // GET /lesson/:lessonId
    // ==========================================

    getById: (lessonId) => {
        return apiClient.get(
            `/lessons/${lessonId}`
        );
    },

    // ==========================================
    // Create lesson
    // POST /lesson/course/:courseId
    // ==========================================

    create: async (
        courseId,
        data,
        onProgress
    ) => {
        return apiClient.post(
            `/lessons/course/${courseId}`,
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

    // ==========================================
    // Update lesson
    // PUT /lesson/:lessonId
    // ==========================================

    update: (lessonId, data) => {
        return apiClient.put(
            `/lessons/${lessonId}`,
            data
        );
    },

    // ==========================================
    // Delete lesson
    // DELETE /lesson/:lessonId
    // ==========================================

    delete: (lessonId) => {
        return apiClient.delete(
            `/lessons/${lessonId}`
        );
    },

    // ==========================================
    // Toggle lock lesson
    // PATCH /lesson/:lessonId/lock
    // ==========================================

    toggleLock: (lessonId) => {
        return apiClient.patch(
            `/lessons/${lessonId}/lock`
        );
    },

    // ==========================================
    // Move lesson
    // PATCH /lesson/:lessonId/move
    // ==========================================

    move: (lessonId, direction) => {
        return apiClient.put(
            `/lessons/${lessonId}/move`,
            {
                direction,
            }
        );
    },

    // ==========================================
    // Restore lesson
    // PATCH /lesson/:lessonId/restore
    // ==========================================

    restore: (lessonId) => {
        return apiClient.patch(
            `/lessons/${lessonId}/restore`
        );
    },
};

export default lessonAPI;