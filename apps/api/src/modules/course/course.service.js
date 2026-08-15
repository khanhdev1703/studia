import courseRepository from "./course.repository.js";

const courseService = {
    async createCourse({
        teacherId,
        title,
        description,
        thumbnail,
    }) {
        if (!title?.trim()) {
            const error = new Error(
                "Vui lòng nhập tên khóa học."
            );

            error.statusCode = 400;
            throw error;
        }

        return courseRepository.create({
            teacherId,
            title: title.trim(),
            description:
                description?.trim() || null,
            thumbnail:
                thumbnail?.trim() || null,
        });
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
    }) {
        const course =
            await courseRepository.findById(courseId);

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;
            throw error;
        }

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền chỉnh sửa khóa học này."
            );

            error.statusCode = 403;
            throw error;
        }

        if (!title?.trim()) {
            const error = new Error(
                "Vui lòng nhập tên khóa học."
            );

            error.statusCode = 400;
            throw error;
        }

        return courseRepository.updateById(
            courseId,
            {
                title: title.trim(),
                description:
                    description?.trim() || null,
                thumbnail:
                    thumbnail?.trim() || null,
            }
        );
    },

    async deleteCourse({
        courseId,
        teacherId,
    }) {
        const course =
            await courseRepository.findById(courseId);

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );

            error.statusCode = 404;
            throw error;
        }

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền xóa khóa học này."
            );

            error.statusCode = 403;
            throw error;
        }

        await courseRepository.deleteById(
            courseId
        );
    },
};

export default courseService;