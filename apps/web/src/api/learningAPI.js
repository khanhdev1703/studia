import apiClient from "./apiClient";

const learningAPI = {
  getCourseForLearning: (courseId) => {
    return apiClient.get(
      `/learning/courses/${courseId}`
    );
  },
  async accessLesson(lessonId) {
    return apiClient.put(
      `/learning/lessons/${lessonId}/access`
    );
  },
  async completeLesson(lessonId) {
    return apiClient.put(
      `/learning/lessons/${lessonId}/complete`
    );
  },
};

export default learningAPI;