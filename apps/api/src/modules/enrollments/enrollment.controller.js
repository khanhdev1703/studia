// src/modules/enrollments/enrollment.controller.js

import enrollmentService from "./enrollment.service.js";

const enrollmentController = {
    // ==========================================
    // Get enrollments by course
    // GET /course/:courseId/enrollments
    // ==========================================

    async getEnrollmentsByCourse(req, res, next) {
        try {
            const { courseId } = req.params;
            const teacherId = req.user.id;

            const enrollments =
                await enrollmentService.getEnrollmentsByCourse({
                    courseId,
                    teacherId,
                });

            return res.status(200).json({
                success: true,
                message:
                    "Lấy danh sách học sinh thành công.",
                data: enrollments,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Enroll student into course
    // POST /course/:courseId/enrollments
    // ==========================================

    async enrollStudent(req, res, next) {
        try {
            const { courseId } = req.params;
            const { studentCode } = req.body;
            const teacherId = req.user.id;

            const enrollment =
                await enrollmentService.enrollStudent({
                    courseId,
                    studentCode,
                    teacherId,
                });

            return res.status(201).json({
                success: true,
                message:
                    "Thêm học sinh vào khóa học thành công.",
                data: enrollment,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Get enrollment by ID
    // GET /enrollment/:enrollmentId
    // ==========================================

    async getEnrollmentById(req, res, next) {
        try {
            const { enrollmentId } = req.params;
            const teacherId = req.user.id;

            const enrollment =
                await enrollmentService.getEnrollmentById({
                    enrollmentId,
                    teacherId,
                });

            return res.status(200).json({
                success: true,
                message:
                    "Lấy thông tin tham gia khóa học thành công.",
                data: enrollment,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Remove student from course
    // DELETE /enrollment/:enrollmentId
    // ==========================================

    async removeEnrollment(req, res, next) {
        try {
            const { enrollmentId } = req.params;
            const teacherId = req.user.id;

            const enrollment =
                await enrollmentService.removeEnrollment({
                    enrollmentId,
                    teacherId,
                });

            return res.status(200).json({
                success: true,
                message:
                    "Xóa học sinh khỏi khóa học thành công.",
                data: enrollment,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default enrollmentController;