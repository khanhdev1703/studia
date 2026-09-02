// src/api/enrollmentAPI.js

import apiClient from "./apiClient";

const enrollmentAPI = {
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
            `/enrollment/${enrollmentId}`
        ),
};

export default enrollmentAPI;