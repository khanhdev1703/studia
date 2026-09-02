// src/services/enrollmentService.js

import enrollmentAPI from "../api/enrollmentAPI";

const enrollmentService = {
    // ==========================================
    // TEACHER
    // ==========================================

    async getByCourse(courseId) {
        const response =
            await enrollmentAPI.getByCourse(
                courseId
            );

        return response.data;
    },

    async enrollStudent(courseId, studentCode) {
        const response =
            await enrollmentAPI.enrollStudent(
                courseId,
                studentCode
            );

        return response.data;
    },

    async getById(enrollmentId) {
        const response =
            await enrollmentAPI.getById(
                enrollmentId
            );

        return response.data;
    },

    async remove(enrollmentId) {
        const response =
            await enrollmentAPI.remove(
                enrollmentId
            );

        return response.data;
    },
};

export default enrollmentService;