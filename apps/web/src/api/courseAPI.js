import apiClient from "./apiClient";

const courseAPI = {
    // ==============================
    // PUBLIC
    // ==============================

    // Tìm kiếm khóa học đang mở
    searchPublishedCoursesApi: ({ search, page, limit } = {}) =>
        apiClient.get("/courses/search", {
            params: {
                search,
                page,
                limit,
            },
        }),

    // Xem chi tiết khóa học
    getCourseDetailsApi: (courseId) =>
        apiClient.get(`/courses/${courseId}`),


    // ==============================
    // TEACHER
    // ==============================

    // Tạo khóa học
    createCourseApi: (data) =>
        apiClient.post("/courses", data),

    // Lấy danh sách khóa học của Teacher hiện tại
    getMyCoursesApi: ({ page, limit } = {}) =>
        apiClient.get("/courses/my", {
            params: {
                page,
                limit,
            },
        }),

    // Cập nhật khóa học
    updateCourseApi: (courseId, data) =>
        apiClient.put(`/courses/${courseId}`, data),

    // Xóa mềm khóa học
    deleteCourseApi: (courseId) =>
        apiClient.delete(`/courses/${courseId}`),


    // ==============================
    // ADMIN
    // ==============================

    // Lấy danh sách khóa học đang hoạt động
    getActiveCoursesApi: ({ page, limit } = {}) =>
        apiClient.get("/courses/admin/active", {
            params: {
                page,
                limit,
            },
        }),

    // Lấy danh sách khóa học đã xóa
    getDeletedCoursesApi: ({ page, limit } = {}) =>
        apiClient.get("/courses/admin/deleted", {
            params: {
                page,
                limit,
            },
        }),

    // Khôi phục khóa học
    restoreCourseApi: (courseId) =>
        apiClient.patch(`/courses/admin/${courseId}/restore`),
};

export default courseAPI;