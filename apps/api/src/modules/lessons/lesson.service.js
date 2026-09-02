// src/modules/lesson/lesson.service.js

import lessonRepository from "./lesson.repository.js";
import courseRepository from "../courses/course.repository.js";

import storage from "../../utils/storage/index.js";
import videoUtils from "../../utils/video.js";

const lessonService = {
    // ==========================================
    // Create lesson
    // ==========================================
    async createLesson({
        courseId,
        teacherId,
        title,
        description,
        video,
        isFree,
    }) {
        // ==========================================
        // Check course
        // ==========================================

        const course =
            await courseRepository.findById(courseId);

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Check course deleted
        // ==========================================

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
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

        const trimmedTitle = title?.trim();

        if (!trimmedTitle) {
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
        // Validate isFree
        // ==========================================

        let parsedIsFree = false;

        if (isFree !== undefined) {
            if (typeof isFree === "boolean") {
                parsedIsFree = isFree;
            } else if (
                isFree === "true" ||
                isFree === "false"
            ) {
                parsedIsFree = isFree === "true";
            } else {
                const error = new Error(
                    "isFree phải là kiểu boolean."
                );

                error.statusCode = 400;
                throw error;
            }
        }

        // ==========================================
        // Get current lessons
        // ==========================================

        const result =
            await lessonRepository.findMaxOrderByCourse(
                courseId
            );

        const order =
            (result._max.order ?? 0) + 1;

        // ==========================================
        // Upload video
        // ==========================================

        let uploadedVideo = null;

        try {
            // ======================================
            // Get video duration
            // Duration: seconds
            // ======================================

            const duration =
                await videoUtils.getVideoDuration(
                    video.path
                );

            // ======================================
            // Upload video
            // ======================================

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

                    title: trimmedTitle,

                    description:
                        description?.trim() || null,

                    video:
                        uploadedVideo.url,

                    duration,

                    order,

                    isFree: parsedIsFree,
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

    // ==========================================
    // Get lessons by course
    // ==========================================
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
        // Check course deleted
        // ==========================================

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Teacher
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
            /*
             * TODO:
             * Kiểm tra Enrollment.
             *
             * Student chỉ được xem lesson
             * khi enrollment.status === "APPROVED".
             */
        }

        // ==========================================
        // Admin
        // ==========================================

        /*
         * ADMIN được phép xem.
         */

        // ==========================================
        // Get lessons
        // ==========================================

        return lessonRepository.findByCourse(
            courseId
        );
    },

    // ==========================================
    // Get lesson by ID
    // ==========================================
    async getLessonById({
        lessonId,
        userId,
        role,
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
        // Check course deleted
        // ==========================================

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Teacher
        // ==========================================

        if (role === "TEACHER") {
            if (course.teacherId !== userId) {
                const error = new Error(
                    "Bạn không có quyền xem bài học này."
                );

                error.statusCode = 403;
                throw error;
            }
        }

        // ==========================================
        // Student
        // ==========================================

        if (role === "STUDENT") {
            /*
             * TODO:
             * Kiểm tra Enrollment.
             */
        }

        // ==========================================
        // Admin
        // ==========================================

        return lesson;
    },

    // ==========================================
    // Update lesson
    // ==========================================
    async updateLesson({
        lessonId,
        teacherId,
        title,
        description,
        video,
        isFree,
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
        // Check course deleted
        // ==========================================

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Check permission
        // ==========================================

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền cập nhật bài học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Validate title
        // ==========================================

        if (title !== undefined) {
            if (!title?.trim()) {
                const error = new Error(
                    "Vui lòng nhập tên bài học."
                );

                error.statusCode = 400;
                throw error;
            }
        }

        // ==========================================
        // Prepare update data
        // ==========================================

        const updateData = {};

        if (title !== undefined) {
            updateData.title =
                title.trim();
        }

        if (description !== undefined) {
            updateData.description =
                description?.trim() || null;
        }

        // ==========================================
        // Validate isFree
        // ==========================================

        if (isFree !== undefined) {
            if (typeof isFree === "boolean") {
                updateData.isFree = isFree;
            } else if (
                isFree === "true" ||
                isFree === "false"
            ) {
                updateData.isFree =
                    isFree === "true";
            } else {
                const error = new Error(
                    "isFree phải là kiểu boolean."
                );

                error.statusCode = 400;
                throw error;
            }
        }

        // ==========================================
        // Update video
        // ==========================================

        let uploadedVideo = null;

        if (video) {
            try {
                // ==================================
                // Get new duration
                // ==================================

                const duration =
                    await videoUtils.getVideoDuration(
                        video.path
                    );

                // ==================================
                // Upload new video
                // ==================================

                uploadedVideo =
                    await storage.upload(
                        video,
                        "lessons"
                    );

                updateData.video =
                    uploadedVideo.url;

                updateData.duration =
                    duration;

                // ==================================
                // Check nothing to update
                // ==================================

                if (
                    Object.keys(updateData)
                        .length === 0
                ) {
                    throw new Error(
                        "Không có thông tin cần cập nhật."
                    );
                }

                // ==================================
                // Update database
                // ==================================

                const updatedLesson =
                    await lessonRepository.update(
                        lessonId,
                        updateData
                    );

                // ==================================
                // Remove old video
                // ==================================

                if (
                    lesson.video &&
                    lesson.video !==
                    uploadedVideo.url
                ) {
                    try {
                        await storage.remove(
                            lesson.video
                        );
                    } catch (removeError) {
                        console.error(
                            "Không thể xóa video cũ:",
                            removeError
                        );
                    }
                }

                return updatedLesson;
            } catch (error) {
                // ==================================
                // Rollback new video
                // ==================================

                if (uploadedVideo?.url) {
                    try {
                        await storage.remove(
                            uploadedVideo.url
                        );
                    } catch (removeError) {
                        console.error(
                            "Không thể xóa video mới sau khi cập nhật thất bại:",
                            removeError
                        );
                    }
                }

                throw error;
            }
        }

        // ==========================================
        // Check nothing to update
        // ==========================================

        if (
            Object.keys(updateData)
                .length === 0
        ) {
            const error = new Error(
                "Không có thông tin cần cập nhật."
            );

            error.statusCode = 400;
            throw error;
        }

        // ==========================================
        // Update database
        // ==========================================

        return lessonRepository.update(
            lessonId,
            updateData
        );
    },

    // ==========================================
    // Delete lesson
    // ==========================================
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
        // Check course deleted
        // ==========================================

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Save current order
        // ==========================================

        const deletedOrder = lesson.order;

        // ==========================================
        // Delete lesson
        // ==========================================

        await lessonRepository.delete(
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
        // Remove video
        // ==========================================

        if (lesson.video) {
            try {
                await storage.remove(
                    lesson.video
                );
            } catch (removeError) {
                console.error(
                    "Không thể xóa video của bài học:",
                    removeError
                );
            }
        }

        return true;
    },

    // ==========================================
    // Move lesson up / down
    // ==========================================
    async moveLesson({
        lessonId,
        teacherId,
        direction,
    }) {
        // ==========================================
        // Validate direction
        // ==========================================

        if (
            direction !== "up" &&
            direction !== "down"
        ) {
            const error = new Error(
                "Hướng di chuyển không hợp lệ."
            );

            error.statusCode = 400;

            throw error;
        }

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
        // Check course deleted
        // ==========================================

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );

            error.statusCode = 404;

            throw error;
        }

        // ==========================================
        // Check permission
        // ==========================================

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền sắp xếp bài học này."
            );

            error.statusCode = 403;

            throw error;
        }

        // ==========================================
        // Move lesson
        // ==========================================

        return lessonRepository.moveLesson({
            lessonId,
            courseId: lesson.courseId,
            currentOrder: lesson.order,
            direction,
        });
    },

    // ==========================================
    // Toggle lock lesson
    // ==========================================

    async toggleLock({
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
        // Check course deleted
        // ==========================================

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Check permission
        // ==========================================

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền khóa bài học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Toggle lock
        // ==========================================

        const isLocked = !lesson.isLocked;

        // ==========================================
        // Update lesson
        // ==========================================

        return lessonRepository.update(
            lessonId,
            {
                isLocked,
            }
        );
    },
};

export default lessonService;