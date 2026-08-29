import learningService from "./learning.service.js";

const learningController = {
  async getCourseForLearning(req, res) {
    try {
      const studentId = req.user.userId;
      const { courseId } = req.params;

      const result =
        await learningService.getCourseForLearning(
          studentId,
          courseId
        );

      return res.status(200).json({
        success: true,
        message:
          "Lấy dữ liệu khóa học thành công.",
        data: result,
      });
    } catch (error) {
      console.error(
        "Get course for learning error:",
        error
      );

      return res.status(
        error.statusCode || 400
      ).json({
        success: false,
        message:
          error.message ||
          "Không thể tải dữ liệu khóa học.",
      });
    }
  },
};

export default learningController;