// src/api/enrollmentAPI.js

import apiClient from "./apiClient";

const enrollmentAPI = {
    // ==========================================
    // TEACHER
    // ==========================================

    // Get all students enrolled in a course
    getByCourse: (courseId) =>
        apiClient.get(
            `/enrollments/course/${courseId}`
        ),

    // Check student's enrollment status
    checkEnrollment: (courseId, studentCode) =>
        apiClient.get(
            `/enrollments/course/${courseId}/check`,
            {
                params: {
                    studentCode,
                },
            }
        ),

    // Enroll student into course
    enrollStudent: (courseId, studentCode, data = {}) =>
        apiClient.post(
            `/enrollments/course/${courseId}`,
            {
                studentCode,
                ...data
            }
        ),

    // Get enrollment by ID
    getById: (enrollmentId) =>
        apiClient.get(
            `/enrollments/${enrollmentId}`
        ),

    // Remove student from course
    remove: (enrollmentId) =>
        apiClient.delete(
            `/enrollments/${enrollmentId}`
        ),
};

export default enrollmentAPI;