import learningAPI from "../api/learningAPI.js";

const learningService = {
  getCourseForLearning: async (courseId) => {
    const response =
      await learningAPI.getCourseForLearning(
        courseId
      );

    return response.data;
  },
  async accessLesson(lessonId) {
    const response =
      await learningAPI.accessLesson(
        lessonId
      );

    return response.data;
  },

  async completeLesson(lessonId) {
    const response =
      await learningAPI.completeLesson(
        lessonId
      );

    return response.data;
  },
};

export default learningService;