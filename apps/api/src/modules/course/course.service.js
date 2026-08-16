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
            await courseRepository.findById(
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

    async deleteCourse({
        courseId,
        teacherId,
    }) {
        // ==========================================
        // Find course
        // ==========================================

        const course =
            await courseRepository.findById(
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
                "Bạn không có quyền xóa khóa học này."
            );

            error.statusCode = 403;
            throw error;
        }

        // ==========================================
        // Delete course from database
        // ==========================================

        await courseRepository.deleteById(
            courseId
        );

        // ==========================================
        // Delete thumbnail
        // ==========================================

        if (course.thumbnail) {
            try {
                await storage.remove(
                    course.thumbnail
                );
            } catch (error) {
                console.error(
                    "Không thể xóa thumbnail của khóa học:",
                    error
                );
            }
        }
    },
};

export default courseService;