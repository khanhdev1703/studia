// src/modules/learning/learning.controller.js

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
        message: "Lấy dữ liệu khóa học thành công.",
        data: result,
      });
    } catch (error) {
      console.error(
        "Get course for learning error:",
        error
      );

      return res
        .status(error.statusCode || 400)
        .json({
          success: false,
          message:
            error.message ||
            "Không thể tải dữ liệu khóa học.",
        });
    }
  },

  async accessLesson(req, res, next) {

    try {
      const { lessonId } = req.params;
      const studentId = req.user.userId;

      const data =
        await learningService.accessLesson(
          studentId,
          lessonId
        );

      return res.status(200).json({
        success: true,
        message: "Đã ghi nhận truy cập bài học.",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async completeLesson(req, res, next) {
    try {
      const { lessonId } = req.params;
      const studentId = req.user.userId;

      const data =
        await learningService.completeLesson(
          studentId,
          lessonId
        );

      return res.status(200).json({
        success: true,
        message: "Đã hoàn thành bài học.",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default learningController;