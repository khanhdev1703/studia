import learningAPI from "../api/learningAPI.js";

const learningService = {
  getCourseForLearning: async (courseId) => {
    const response =
      await learningAPI.getCourseForLearning(
        courseId
      );

    return response.data;
  },
};

export default learningService;