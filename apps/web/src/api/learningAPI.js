// src/api/learningAPI.js

import apiClient from "./apiClient";

const learningAPI = {
  // ==========================================
  // STUDENT
  // ==========================================

  getMyCourses: () =>
    apiClient.get(
      "/learning/my-courses"
    ),
  // ==========================================
  // Get course for learning
  // GET /learning/courses/:courseId
  // ==========================================

  getCourseForLearning: (courseId) => {
    return apiClient.get(
      `/learning/courses/${courseId}`
    );
  },

  // ==========================================
  // Access lesson
  // POST /learning/lessons/:lessonId/access
  // ==========================================

  accessLesson: (lessonId) => {
    return apiClient.post(
      `/learning/lessons/${lessonId}/access`
    );
  },

  // ==========================================
  // Complete lesson
  // POST /learning/lessons/:lessonId/complete
  // ==========================================

  completeLesson: (lessonId) => {
    return apiClient.post(
      `/learning/lessons/${lessonId}/complete`
    );
  },

  // ==========================================
  // Get course progress
  // GET /learning/courses/:courseId/progress
  // ==========================================

  getCourseProgress: (courseId) => {
    return apiClient.get(
      `/learning/courses/${courseId}/progress`
    );
  },

  // ==========================================
  // Get lesson progress
  // GET /learning/lessons/:lessonId/progress
  // ==========================================

  getLessonProgress: (lessonId) => {
    return apiClient.get(
      `/learning/lessons/${lessonId}/progress`
    );
  },
};

export default learningAPI;