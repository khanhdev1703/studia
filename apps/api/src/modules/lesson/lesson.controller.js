// src/modules/lesson/lesson.controller.js

import lessonService from "./lesson.service.js";

const lessonController = {
    // ==========================================
    // Create lesson
    // POST /course/:courseId
    // ==========================================

    async createLesson(req, res, next) {
        try {
            const {
                title,
                description,
                document,
            } = req.body;

            const lesson =
                await lessonService.createLesson({
                    courseId: req.params.courseId,
                    teacherId: req.user.userId,
                    title,
                    description,
                    document,
                    // Video được Multer xử lý
                    video: req.file,
                });

            res.status(201).json({
                success: true,

                message:
                    "Tạo bài học thành công.",

                data: lesson,
            });
        } catch (error) {
            next(error);
        }
    },

    async getLessonsByCourse(req, res, next) {
        try {
            const lessons =
                await lessonService.getLessonsByCourse({
                    courseId: req.params.courseId,
                    userId: req.user.userId,
                    role: req.user.role,
                });

            res.status(200).json({
                success: true,
                message:
                    "Lấy danh sách bài học thành công.",
                data: lessons,
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteVideo(req, res, next) {
        try {
            await lessonService.deleteLesson({
                lessonId: req.params.id,
                teacherId: req.user.userId,
            });

            res.status(200).json({
                success: true,
                message: "Xóa bài học thành công.",
            });
        } catch (error) {
            next(error);
        }
    }
};

export default lessonController;