import enrollmentAPI from "../api/enrollmentAPI";

const enrollmentService = {
    // ==========================================
    // Student
    // ==========================================

    enroll: async (courseId) => {
        const response =
            await enrollmentAPI.enroll(courseId);

        return response.data;
    },

    getByCourse: async (courseId) => {
        const response =
            await enrollmentAPI.getByCourse(courseId);

        return response.data;
    },

    getMyEnrollments: async (params = {}) => {
        const response =
            await enrollmentAPI.getMyEnrollments(params);

        return response.data;
    },

    cancel: async (courseId) => {
        const response =
            await enrollmentAPI.cancel(courseId);

        return response.data;
    },

    // ==========================================
    // Teacher
    // ==========================================

    getTeacherPendingRequests: async () => {
        const response =
            await enrollmentAPI.getTeacherPendingRequests();

        return response.data;
    },

    approve: async (enrollmentId) => {
        const response =
            await enrollmentAPI.approve(
                enrollmentId
            );

        return response.data;
    },

    reject: async (enrollmentId) => {
        const response =
            await enrollmentAPI.reject(
                enrollmentId
            );

        return response.data;
    },
};

export default enrollmentService;