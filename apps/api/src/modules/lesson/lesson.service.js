// src/modules/lesson/lesson.service.js

import lessonRepository from "./lesson.repository.js";
import courseRepository from "../course/course.repository.js";

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
        document,
        video,
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

        const order = lessons.length + 1;

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

                    title: title.trim(),

                    description:
                        description?.trim() || null,

                    document:
                        document?.trim() || null,

                    video:
                        uploadedVideo.url,

                    duration,

                    order,

                    isLocked: false,

                    deletedAt: null,
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
            // TODO:
            // Sau này kiểm tra Enrollment.
            //
            // Student chỉ được xem lesson
            // khi enrollment.status === "APPROVED".

            // Tạm thời giữ nguyên logic hiện tại.
        }

        // ==========================================
        // Admin
        // ==========================================

        // ADMIN được phép xem.

        // ==========================================
        // Get lessons
        // ==========================================

        return lessonRepository.findByCourseId(
            courseId
        );
    },

    // ==========================================
    // Get lesson by id
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
            // TODO:
            // Kiểm tra Enrollment.
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
        document,
        video,
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
        // Cannot update deleted lesson
        // ==========================================

        if (lesson.deletedAt) {
            const error = new Error(
                "Bài học đã bị xóa. Vui lòng khôi phục trước khi cập nhật."
            );

            error.statusCode = 400;
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
                "Bạn không có quyền cập nhật bài học này."
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
        // Prepare update data
        // ==========================================

        const updateData = {
            title: title.trim(),

            description:
                description?.trim() || null,

            document:
                document?.trim() || null,
        };

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
                // Update database
                // ==================================

                const updatedLesson =
                    await lessonRepository.updateById(
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
        // Update without video
        // ==========================================

        return lessonRepository.updateById(
            lessonId,
            updateData
        );
    },

    // ==========================================
    // Soft delete lesson
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
        // Already deleted
        // ==========================================

        if (lesson.deletedAt) {
            const error = new Error(
                "Bài học đã được xóa."
            );

            error.statusCode = 400;
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
        // Soft delete
        // ==========================================

        await lessonRepository.softDelete(
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
        // Do NOT delete video
        //
        // Because lesson can be restored later.
        // ==========================================

        return true;
    },

    // ==========================================
    // Restore lesson
    // ==========================================
    async restoreLesson({
        lessonId,
        teacherId,
    }) {
        // ==========================================
        // Find lesson including deleted lesson
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
        // Check deleted state
        // ==========================================

        if (!lesson.deletedAt) {
            const error = new Error(
                "Bài học này chưa bị xóa."
            );

            error.statusCode = 400;
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
                "Bạn không có quyền khôi phục bài học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Get active lessons
        // ==========================================

        const lessons =
            await lessonRepository.findByCourseId(
                lesson.courseId
            );

        // ==========================================
        // Put restored lesson at the end
        // ==========================================

        const order = lessons.length + 1;

        return lessonRepository.restoreById(
            lessonId,
            order
        );
    },

    // ==========================================
    // Lock / Unlock lesson
    // ==========================================
    async toggleLock({
        lessonId,
        teacherId,
        isLocked,
    }) {
        // ==========================================
        // Validate isLocked
        // ==========================================

        if (typeof isLocked !== "boolean") {
            const error = new Error(
                "isLocked phải là kiểu boolean."
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
        // Cannot modify deleted lesson
        // ==========================================

        if (lesson.deletedAt) {
            const error = new Error(
                "Không thể thay đổi trạng thái bài học đã bị xóa."
            );

            error.statusCode = 400;
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
                "Bạn không có quyền thay đổi bài học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Update lock status
        // ==========================================

        return lessonRepository.updateById(
            lessonId,
            {
                isLocked,
            }
        );
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
        // Find current lesson
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
        // Cannot move deleted lesson
        // ==========================================

        if (lesson.deletedAt) {
            const error = new Error(
                "Không thể di chuyển bài học đã bị xóa."
            );

            error.statusCode = 400;
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
                "Bạn không có quyền sắp xếp bài học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Find adjacent lesson
        // ==========================================

        let adjacentLesson;

        if (direction === "up") {
            adjacentLesson =
                await lessonRepository.findPrevious(
                    lesson.courseId,
                    lesson.order
                );
        } else {
            adjacentLesson =
                await lessonRepository.findNext(
                    lesson.courseId,
                    lesson.order
                );
        }

        // ==========================================
        // Already at first / last position
        // ==========================================

        if (!adjacentLesson) {
            return lesson;
        }

        // ==========================================
        // Swap order
        // ==========================================

        return lessonRepository.swapOrder(
            lessonId,
            lesson.order,
            adjacentLesson.id,
            adjacentLesson.order
        );
    },
};

export default lessonService;