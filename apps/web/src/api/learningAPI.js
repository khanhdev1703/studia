import apiClient from "./apiClient";

const learningAPI = {
  getCourseForLearning: (courseId) => {
    return apiClient.get(
      `/learning/courses/${courseId}`
    );
  },
};

export default learningAPI;