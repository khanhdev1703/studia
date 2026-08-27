import apiClient from "./apiClient";

const enrollmentAPI = {
    // ==========================================
    // Student
    // ==========================================

    // Đăng ký khóa học
    enroll: (courseId) => {
        return apiClient.post(
            `/enrollment/${courseId}`
        );
    },

    // Lấy enrollment của bản thân với khóa học
    getByCourse: (courseId) => {
        return apiClient.get(
            `/enrollment/course/${courseId}`
        );
    },

    // Lấy danh sách khóa học đã đăng ký
    getMyEnrollments: (params = {}) => {
        return apiClient.get(
            "/enrollment/me",
            {
                params,
            }
        );
    },

    // Hủy yêu cầu đăng ký
    cancel: (courseId) => {
        return apiClient.delete(
            `/enrollment/${courseId}`
        );
    },

    // ==========================================
    // Teacher
    // ==========================================

    // Lấy danh sách enrollment của khóa học
    getTeacherPendingRequests: () => {
        return apiClient.get(`/enrollment`);
    },

    // Duyệt enrollment
    approve: (enrollmentId) => {
        return apiClient.patch(
            `/enrollment/${enrollmentId}/approve`
        );
    },

    // Từ chối enrollment
    reject: (enrollmentId) => {
        return apiClient.patch(
            `/enrollment/${enrollmentId}/reject`
        );
    },
};

export default enrollmentAPI;