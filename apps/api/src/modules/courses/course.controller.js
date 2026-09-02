import courseService from "./course.service.js";

import AppError from "../../utils/appError.js";

const courseController = {
    /*
     * ==========================================
     * TEACHER → CREATE COURSE
     * ==========================================
     */

    async createCourse(req, res, next) {
        try {
            const {
                title,
                description,
                price = 0,
                durationMonths,
            } = req.body;

            const course =
                await courseService.createCourse({
                    teacherId: req.user.id,
                    title,
                    description,
                    thumbnail: req.file,
                    price,
                    durationMonths,
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

    /*
     * ==========================================
     * TEACHER → GET COURSES
     * ==========================================
     */

    async getTeacherCourses(req, res, next) {
        try {
            const {
                page,
                limit,
            } = req.query;


            const result =
                await courseService.getCoursesByTeacher({
                    teacherId: req.user.id,
                    page,
                    limit,
                });

            res.status(200).json({
                success: true,
                message: "Lấy danh sách khóa học thành công.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    /*
     * ==========================================
     * PUBLIC / STUDENT → SEARCH COURSES
     * ==========================================
     */

    async searchPublishedCourses(req, res, next) {
        try {
            const {
                search,
                page,
                limit,
            } = req.query;

            const result =
                await courseService.searchPublishedCourses({
                    search,
                    page,
                    limit,
                });

            res.status(200).json({
                success: true,
                message: "Lấy danh sách khóa học thành công.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    /*
     * ==========================================
     * PUBLIC / STUDENT → GET COURSE DETAIL
     * ==========================================
     */

    async getCourseDetails(req, res, next) {
        try {
            const { id } = req.params;

            const course =
                await courseService.getCourseDetails(id);

            res.status(200).json({
                success: true,
                message: "Lấy thông tin khóa học thành công.",
                data: course,
            });
        } catch (error) {
            next(error);
        }
    },

    /*
     * ==========================================
     * GET COURSE BY ID
     * ==========================================
     */

    async getCourseById(req, res, next) {
        try {
            const { id } = req.params;

            const course =
                await courseService.getCourseById(id);

            res.status(200).json({
                success: true,
                message: "Lấy thông tin khóa học thành công.",
                data: course,
            });
        } catch (error) {
            next(error);
        }
    },

    /*
     * ==========================================
     * TEACHER → UPDATE COURSE
     * ==========================================
     */

    async updateCourse(req, res, next) {
        try {
            const { id } = req.params;

            const {
                title,
                description,
                price,
                durationMonths,
                status,
            } = req.body;


            const course = await courseService.updateCourse({
                courseId: id,
                teacherId: req.user.userId,
                title,
                description,
                thumbnail: req.file,
                price,
                durationMonths,
                status,
            });

            res.status(200).json({
                success: true,
                message: "Cập nhật khóa học thành công.",
                data: course,
            });
        } catch (error) {
            next(error);
        }
    },

    /*
     * ==========================================
     * TEACHER → DELETE COURSE
     * ==========================================
     */

    async deleteCourse(req, res, next) {
        try {
            const { id } = req.params;

            await courseService.deleteCourse({
                courseId: id,
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

    /*
     * ==========================================
     * ADMIN → GET ACTIVE COURSES
     * ==========================================
     */

    async getActiveCourses(req, res, next) {
        try {
            const {
                page,
                limit,
            } = req.query;

            const result =
                await courseService.getActiveCourses({
                    page,
                    limit,
                });

            res.status(200).json({
                success: true,
                message: "Lấy danh sách khóa học thành công.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    /*
     * ==========================================
     * ADMIN → GET DELETED COURSES
     * ==========================================
     */

    async getDeletedCourses(req, res, next) {
        try {
            const {
                page,
                limit,
            } = req.query;

            const result =
                await courseService.getDeletedCourses({
                    page,
                    limit,
                });

            res.status(200).json({
                success: true,
                message: "Lấy danh sách khóa học đã xóa thành công.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    /*
     * ==========================================
     * ADMIN → RESTORE COURSE
     * ==========================================
     */

    async restoreCourse(req, res, next) {
        try {
            const { id } = req.params;

            await courseService.restoreCourse(id);

            res.status(200).json({
                success: true,
                message: "Khôi phục khóa học thành công.",
            });
        } catch (error) {
            next(error);
        }
    },
};

export default courseController;