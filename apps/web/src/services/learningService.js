// src/services/learningService.js

import learningAPI from "../api/learningAPI.js";

const learningService = {
  // ==========================================
  // STUDENT
  // ==========================================

  async getMyCourses() {
    const response =
      await learningAPI.getMyCourses();

    return response.data;
  },
  // ==========================================
  // Get course for learning
  // ==========================================

  async getCourseForLearning(courseId) {
    const response =
      await learningAPI.getCourseForLearning(
        courseId
      );

    return response.data;
  },

  // ==========================================
  // Access lesson
  // ==========================================

  async accessLesson(lessonId) {
    const response =
      await learningAPI.accessLesson(
        lessonId
      );

    return response.data;
  },

  // ==========================================
  // Complete lesson
  // ==========================================

  async completeLesson(lessonId) {
    const response =
      await learningAPI.completeLesson(
        lessonId
      );

    return response.data;
  },

  // ==========================================
  // Get course progress
  // ==========================================

  async getCourseProgress(courseId) {
    const response =
      await learningAPI.getCourseProgress(
        courseId
      );

    return response.data;
  },

  // ==========================================
  // Get lesson progress
  // ==========================================

  async getLessonProgress(lessonId) {
    const response =
      await learningAPI.getLessonProgress(
        lessonId
      );

    return response.data;
  },
};

export default learningService;