import courseService from "./course.service.js";

const courseController = {
    async createCourse(req, res, next) {
        try {
            const { title, description, thumbnail } =
                req.body;

            const course =
                await courseService.createCourse({
                    teacherId: req.user.userId,
                    title,
                    description,
                    thumbnail,
                });

            res.status(201).json({
                success: true,
                message: "Tạo khóa học thành công.",
                data: course,
            });
        } catch (error) {
            next(error);
        }
    },

    async getTeacherCourses(req, res, next) {
        try {
            const courses =
                await courseService.getTeacherCourses(
                    req.user.userId
                );

            res.status(200).json({
                success: true,
                message:
                    "Lấy danh sách khóa học thành công.",
                data: courses,
            });
        } catch (error) {
            next(error);
        }
    },

    async getCourseById(req, res, next) {
        try {
            const course =
                await courseService.getCourseById(
                    req.params.id,
                    req.user
                );

            res.status(200).json({
                success: true,
                message:
                    "Lấy thông tin khóa học thành công.",
                data: course,
            });
        } catch (error) {
            next(error);
        }
    },

    async updateCourse(req, res, next) {
        try {
            const { title, description, thumbnail, status } =
                req.body;

            const course =
                await courseService.updateCourse({
                    courseId: req.params.id,
                    teacherId: req.user.userId,
                    title,
                    description,
                    thumbnail,
                    status,
                });

            res.status(200).json({
                success: true,
                message:
                    "Cập nhật khóa học thành công.",
                data: course,
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteCourse(req, res, next) {
        try {
            await courseService.deleteCourse({
                courseId: req.params.id,
                teacherId: req.user.userId,
            });

            res.status(200).json({
                success: true,
                message: "Xóa khóa học thành công.",
            });
        } catch (error) {
            next(error);
        }
    },
};

export default courseController;