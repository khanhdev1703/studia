// src/api/enrollmentAPI.js

import apiClient from "./apiClient";

const enrollmentAPI = {
    // ==========================================
    // TEACHER
    // ==========================================

    getByCourse: (courseId) =>
        apiClient.get(
            `/enrollments/course/${courseId}`
        ),

    enrollStudent: (courseId, studentCode) =>
        apiClient.post(
            `/enrollments/course/${courseId}`,
            {
                studentCode,
            }
        ),

    getById: (enrollmentId) =>
        apiClient.get(
            `/enrollments/${enrollmentId}`
        ),

    remove: (enrollmentId) =>
        apiClient.delete(
            `/enrollments/${enrollmentId}`
        ),
};

export default enrollmentAPI;