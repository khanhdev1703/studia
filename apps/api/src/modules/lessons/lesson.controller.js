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
                isFree,
            } = req.body;

            const lesson = await lessonService.createLesson({
                courseId: req.params.courseId,
                teacherId: req.user.id,

                title,
                description,
                isFree,

                // Multer xử lý video.
                // Service sẽ xử lý upload và duration.
                video: req.file,
            });

            res.status(201).json({
                success: true,
                message: "Tạo bài học thành công.",
                data: lesson,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Get lessons by course
    // GET /course/:courseId
    // ==========================================
    async getLessonsByCourse(req, res, next) {
        try {
            const lessons =
                await lessonService.getLessonsByCourse({
                    courseId: req.params.courseId,
                    userId: req.user.id,
                    role: req.user.role,
                });

            res.status(200).json({
                success: true,
                message: "Lấy danh sách bài học thành công.",
                data: lessons,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Get lesson by id
    // GET /:id
    // ==========================================
    async getLessonById(req, res, next) {
        try {
            const lesson =
                await lessonService.getLessonById({
                    lessonId: req.params.id,
                    userId: req.user.id,
                    role: req.user.role,
                });

            res.status(200).json({
                success: true,
                message: "Lấy thông tin bài học thành công.",
                data: lesson,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Update lesson
    // PUT /:id
    // ==========================================
    async updateLesson(req, res, next) {
        try {
            const {
                title,
                description,
                isFree,
            } = req.body;

            const lesson =
                await lessonService.updateLesson({
                    lessonId: req.params.id,
                    teacherId: req.user.id,

                    title,
                    description,
                    isFree,

                    // Nếu có video mới:
                    // service sẽ upload và tính lại duration.
                    video: req.file,
                });

            res.status(200).json({
                success: true,
                message: "Cập nhật bài học thành công.",
                data: lesson,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Delete lesson
    // DELETE /:id
    //
    // Lesson hiện tại không có isDelete,
    // nên đây là hard delete.
    // ==========================================
    async deleteLesson(req, res, next) {
        try {
            await lessonService.deleteLesson({
                lessonId: req.params.id,
                teacherId: req.user.id,
            });

            res.status(200).json({
                success: true,
                message: "Xóa bài học thành công.",
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Move lesson
    // PUT /:id/move
    // ==========================================
    async moveLesson(req, res, next) {
        try {
            const { direction } = req.body;

            const lesson =
                await lessonService.moveLesson({
                    lessonId: req.params.id,
                    teacherId: req.user.id,
                    direction,
                });

            res.status(200).json({
                success: true,
                message:
                    direction === "up"
                        ? "Di chuyển bài học lên thành công."
                        : "Di chuyển bài học xuống thành công.",
                data: lesson,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Toggle lock lesson
    // PATCH /:id/lock
    // ==========================================

    async toggleLock(req, res, next) {
        try {
            const lesson = await lessonService.toggleLock({
                lessonId: req.params.id,
                teacherId: req.user.id,
            });

            res.status(200).json({
                success: true,
                message: lesson.isLocked
                    ? "Khóa bài học thành công."
                    : "Mở khóa bài học thành công.",
                data: lesson,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default lessonController;