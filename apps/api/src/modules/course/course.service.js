import storage from "../../utils/storage/index.js";
import courseRepository from "./course.repository.js";

const courseService = {
    // src/modules/course/course.service.js

    async createCourse({
        teacherId,
        title,
        description,
        thumbnail,
    }) {
        // ==========================================
        // Validate title
        // ==========================================

        if (!title?.trim()) {
            const error = new Error(
                "Vui lòng nhập tên khóa học."
            );

            error.statusCode = 400;
            throw error;
        }

        // ==========================================
        // Prepare create data
        // ==========================================

        const createData = {
            teacherId,

            title: title.trim(),

            description:
                description?.trim() || null,
        };

        // ==========================================
        // Upload thumbnail
        // ==========================================

        if (thumbnail) {
            const uploaded =
                await storage.upload(
                    thumbnail,
                    "courses"
                );

            createData.thumbnail =
                uploaded.url;
        }

        // ==========================================
        // Create database
        // ==========================================

        return courseRepository.create(
            createData
        );
    },

    async getTeacherCourses(teacherId) {
        return courseRepository.findByTeacherId(
            teacherId
        );
    },

    async getCourseById(courseId, user) {
        const course =
            await courseRepository.findById(courseId);

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;
            throw error;
        }

        if (
            user.role === "TEACHER" &&
            course.teacherId !== user.userId
        ) {
            const error = new Error(
                "Bạn không có quyền truy cập khóa học này."
            );

            error.statusCode = 403;
            throw error;
        }

        return course;
    },

    async updateCourse({
        courseId,
        teacherId,
        title,
        description,
        thumbnail,
        status,
    }) {
        const course =
            await courseRepository.findActiveById(
                courseId
            );

        // ==========================================
        // Check course
        // ==========================================

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
                "Bạn không có quyền chỉnh sửa khóa học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Validate title
        // ==========================================

        if (!title?.trim()) {
            const error = new Error(
                "Vui lòng nhập tên khóa học."
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
        };

        // ==========================================
        // Status
        // ==========================================

        if (status) {
            updateData.status = status;
        }

        // ==========================================
        // Upload thumbnail
        // ==========================================

        if (thumbnail) {
            const uploaded =
                await storage.upload(
                    thumbnail,
                    "courses"
                );

            updateData.thumbnail =
                uploaded.url;
        }

        // ==========================================
        // Update database
        // ==========================================

        const updatedCourse =
            await courseRepository.updateById(
                courseId,
                updateData
            );

        // ==========================================
        // Delete old thumbnail
        // ==========================================

        if (
            thumbnail &&
            course.thumbnail
        ) {
            try {
                await storage.remove(
                    course.thumbnail
                );
            } catch (error) {
                console.error(
                    "Không thể xóa thumbnail cũ:",
                    error
                );
            }
        }

        return updatedCourse;
    },

    // ==========================================
    // Teacher → Soft delete
    // ==========================================

    async softDeleteCourse({ courseId, teacherId }) {
        const course =
            await courseRepository.findById(courseId);

        // Check course
        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;
            throw error;
        }

        // Check ownership
        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền xóa khóa học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // Check already deleted
        if (course.deletedAt) {
            const error = new Error(
                "Khóa học đã được xóa."
            );

            error.statusCode = 400;
            throw error;
        }

        // Soft delete
        return courseRepository.softDeleteById(
            courseId
        );
    },

    // ==========================================
    // Admin → Hard delete
    // ==========================================

    async hardDeleteCourse({ courseId }) {
        const course =
            await courseRepository.findById(courseId);

        // Check course
        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;
            throw error;
        }

        // ==========================================
        // Find lessons
        // ==========================================

        const lessons =
            await lessonRepository.findByCourseId(
                courseId
            );

        // ==========================================
        // Delete lesson files
        // ==========================================

        for (const lesson of lessons) {
            if (lesson.video) {
                await storage.remove(
                    lesson.video
                );
            }

            if (lesson.document) {
                await storage.remove(
                    lesson.document
                );
            }
        }

        // ==========================================
        // Delete course thumbnail
        // ==========================================

        if (course.thumbnail) {
            await storage.remove(
                course.thumbnail
            );
        }

        // ==========================================
        // Delete lessons
        // ==========================================

        const deletedLessons =
            await lessonRepository.deleteByCourseId(
                courseId
            );

        // ==========================================
        // Hard delete course
        // ==========================================

        await courseRepository.deleteById(
            courseId
        );

        return {
            courseId,
            deletedLessons: deletedLessons.count,
        };
    },
};

export default courseService;