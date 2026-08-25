import storage from "../../utils/storage/index.js";

import courseRepository from "./course.repository.js";

const courseService = {
    // ==========================================
    // Teacher → Create course
    // ==========================================
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
            description: description?.trim() || null,
        };

        // ==========================================
        // Upload thumbnail
        // ==========================================
        if (thumbnail) {
            const uploaded = await storage.upload(
                thumbnail,
                "courses"
            );

            createData.thumbnail = uploaded.url;
        }

        // ==========================================
        // Create database
        // ==========================================
        return courseRepository.create(createData);
    },

    // ==========================================
    // Teacher → Get courses
    // ==========================================
    async getTeacherCourses(teacherId) {
        return courseRepository.findByTeacherId(
            teacherId
        );
    },

    // ==========================================
    // Student → Get published courses
    // ==========================================
    async getPublishedCourses({ search } = {}) {
        const courses =
            await courseRepository.findPublishedCourses({
                search,
            });

        return courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            price: course.price,

            teacher: {
                id: course.teacher.id,
                name: course.teacher.name,
            },

            lessonCount: course._count.lessons,

            duration: course.lessons.reduce(
                (total, lesson) => total + (lesson.duration || 0),
                0
            ),
        }));
    },

    async getPublishedCourseDetail(courseId) {
        const course =
            await courseRepository.findPublishedById(
                courseId
            );

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;

            throw error;
        }

        // Tổng thời lượng tất cả lesson
        const totalDuration = course.lessons.reduce(
            (total, lesson) => {
                return total + (lesson.duration || 0);
            },
            0
        );

        // const hours = Math.floor(totalDuration / 60);
        // const minutes = totalDuration % 60;

        // let duration = "";

        // if (hours > 0) {
        //     duration += `${hours} giờ`;
        // }

        // if (minutes > 0) {
        //     duration += duration
        //         ? ` ${minutes} phút`
        //         : `${minutes} phút`;
        // }

        // if (!duration) {
        //     duration = "Chưa cập nhật";
        // }

        return {
            id: course.id,
            title: course.title,
            description: course.description,
            teacher: course.teacher?.name || "Chưa cập nhật",
            thumbnail: course.thumbnail,
            lessonCount: course.lessons.length,
            totalDuration,
            price: course.price,

            lessons: course.lessons.map((lesson) => ({
                id: lesson.id,
                title: lesson.title,
                duration: lesson.duration,
                isLocked: lesson.isLocked,
            })),
        };
    },

    // ==========================================
    // Get course by ID
    // ==========================================
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

    // ==========================================
    // Teacher → Update course
    // ==========================================
    async updateCourse({
        courseId,
        teacherId,
        title,
        description,
        thumbnail,
        status,
        price,
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

        if (price !== undefined) {
            updateData.price = Number(price);
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

            updateData.thumbnail = uploaded.url;
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
    async softDeleteCourse({
        courseId,
        teacherId,
    }) {
        const course =
            await courseRepository.findById(
                courseId
            );

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
            await courseRepository.findById(
                courseId
            );

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
            deletedLessons:
                deletedLessons.count,
        };
    },
};

export default courseService;