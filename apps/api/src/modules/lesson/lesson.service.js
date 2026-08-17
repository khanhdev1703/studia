// src/modules/lesson/lesson.service.js

import lessonRepository from "./lesson.repository.js";
import courseRepository from "../course/course.repository.js";
import storage from "../../utils/storage/index.js";
import videoUtils from "../../utils/video.js"

const lessonService = {
    // ==========================================
    // Create lesson
    // ==========================================

    async createLesson({
        courseId,
        teacherId,
        title,
        description,
        document,
        video,
    }) {
        // ==========================================
        // Check course
        // ==========================================
        console.log(video);

        const course =
            await courseRepository.findById(
                courseId
            );

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Check permission
        // ==========================================

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền thêm bài học vào khóa học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Validate title
        // ==========================================

        if (!title?.trim()) {
            const error = new Error(
                "Vui lòng nhập tên bài học."
            );

            error.statusCode = 400;
            throw error;
        }

        // ==========================================
        // Validate video
        // ==========================================

        if (!video) {
            const error = new Error(
                "Vui lòng upload video bài học."
            );

            error.statusCode = 400;
            throw error;
        }

        // ==========================================
        // Get current lessons
        // ==========================================

        const lessons =
            await lessonRepository.findByCourseId(
                courseId
            );



        const order = lessons.length;

        // ==========================================
        // Upload video
        // ==========================================

        let uploadedVideo = null;

        try {
            const duration =
                await videoUtils.getVideoDuration(
                    video.path
                );

            console.log("Duration", duration);

            uploadedVideo =
                await storage.upload(
                    video,
                    "lessons"
                );

            // ======================================
            // Create lesson
            // ======================================

            const lesson =
                await lessonRepository.create({
                    courseId,

                    title: title.trim(),

                    description:
                        description?.trim() ||
                        null,

                    document:
                        document?.trim() ||
                        null,

                    duration,
                    video:
                        uploadedVideo.url,

                    order,
                });

            return lesson;
        } catch (error) {
            // ======================================
            // Rollback uploaded video
            // ======================================

            if (uploadedVideo?.url) {
                try {
                    await storage.remove(
                        uploadedVideo.url
                    );
                } catch (removeError) {
                    console.error(
                        "Không thể xóa video sau khi tạo lesson thất bại:",
                        removeError
                    );
                }
            }

            throw error;
        }
    },

    async getLessonsByCourse({
        courseId,
        userId,
        role,
    }) {
        // ==========================================
        // Check course
        // ==========================================

        const course =
            await courseRepository.findById(
                courseId
            );

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;

            throw error;
        }

        // ==========================================
        // Check permission
        // ==========================================

        if (role === "TEACHER") {
            if (course.teacherId !== userId) {
                const error = new Error(
                    "Bạn không có quyền xem bài học của khóa học này."
                );

                error.statusCode = 403;

                throw error;
            }
        }

        // ==========================================
        // Student
        // ==========================================

        if (role === "STUDENT") {
            // TODO:
            // Kiểm tra Enrollment của student
            //
            // enrollment.status === "APPROVED"

            // Tạm thời chưa implement
        }

        // ==========================================
        // Admin
        // ==========================================

        // ADMIN được xem tất cả

        // ==========================================
        // Get lessons
        // ==========================================

        return lessonRepository.findByCourseId(
            courseId
        );
    },

    async deleteLesson({
        lessonId,
        teacherId,
    }) {
        // ==========================================
        // Find lesson
        // ==========================================

        const lesson =
            await lessonRepository.findById(
                lessonId
            );

        if (!lesson) {
            const error = new Error(
                "Không tìm thấy bài học."
            );

            error.statusCode = 404;

            throw error;
        }

        // ==========================================
        // Find course
        // ==========================================

        const course =
            await courseRepository.findById(
                lesson.courseId
            );

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;

            throw error;
        }

        // ==========================================
        // Check permission
        // ==========================================

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền xóa bài học này."
            );

            error.statusCode = 403;

            throw error;
        }

        // ==========================================
        // Save current order
        // ==========================================

        const deletedOrder = lesson.order;

        // ==========================================
        // Delete lesson
        // ==========================================

        await lessonRepository.deleteById(
            lessonId
        );

        // ==========================================
        // Reorder remaining lessons
        // ==========================================

        await lessonRepository.decreaseOrderAfter(
            lesson.courseId,
            deletedOrder
        );

        // ==========================================
        // Delete video
        // ==========================================

        if (lesson.video) {
            try {
                await storage.remove(
                    lesson.video
                );
            } catch (error) {
                console.error(
                    "Không thể xóa video của bài học:",
                    error
                );
            }
        }

        return true;
    },
};

export default lessonService;