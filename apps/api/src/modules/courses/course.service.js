import storage from "../../utils/storage/index.js";

import courseRepository from "./course.repository.js";

import AppError from "../../utils/appError.js";
import lessonRepository from "../lessons/lesson.repository.js";
import enrollmentRepository from "../enrollments/enrollment.repository.js";

const courseService = {
    /*
     * ==========================================
     * TEACHER → CREATE COURSE
     * ==========================================
     */

    async createCourse({
        teacherId,
        title,
        description,
        thumbnail,
        price,
        durationMonths,
    }) {
        /*
         * Validate title
         */

        const trimmedTitle = title?.trim();

        if (!trimmedTitle) {
            throw new AppError(
                "Vui lòng nhập tên khóa học.",
                400
            );
        }

        /*
         * Validate price
         */

        if (
            price !== undefined &&
            (
                !Number.isInteger(Number(price)) ||
                Number(price) < 0
            )
        ) {
            throw new AppError(
                "Giá khóa học không hợp lệ.",
                400
            );
        }

        /*
         * Validate duration
         */

        if (
            durationMonths !== undefined &&
            durationMonths !== null &&
            (
                !Number.isInteger(Number(durationMonths)) ||
                Number(durationMonths) <= 0
            )
        ) {
            throw new AppError(
                "Thời hạn khóa học không hợp lệ.",
                400
            );
        }

        /*
         * Prepare data
         */

        const createData = {
            teacherId,
            title: trimmedTitle,
            description: description?.trim() || null,
            price: price !== undefined
                ? Number(price)
                : 0,
            durationMonths:
                durationMonths !== undefined &&
                    durationMonths !== null
                    ? Number(durationMonths)
                    : null,
        };

        /*
         * Upload thumbnail
         */

        if (thumbnail) {
            const uploaded = await storage.upload(
                thumbnail,
                "courses"
            );

            createData.thumbnail = uploaded.url;
        }

        /*
         * Create course
         */

        return courseRepository.create(createData);
    },

    /*
     * ==========================================
     * TEACHER → GET COURSES
     * ==========================================
     */

    async getCoursesByTeacher({ teacherId } = {}) {
        const courses =
            await courseRepository.findCoursesByTeacher({
                teacherId,
            });

        const coursesWithCount =
            await Promise.all(
                courses.map(async (course) => {
                    const [
                        lessonCount,
                        enrollmentCount,
                    ] = await Promise.all([
                        lessonRepository.countByCourse(
                            course.id
                        ),

                        enrollmentRepository.countByCourseId(
                            course.id
                        ),
                    ]);

                    return {
                        ...course,
                        lessonCount,
                        enrollmentCount,
                    };
                })
            );

        return coursesWithCount;
    },

    /*
     * ==========================================
     * PUBLIC / STUDENT → SEARCH COURSES
     * ==========================================
     */

    async searchPublishedCourses({
        search,
        page = 1,
        limit = 12,
    } = {}) {
        const currentPage = Math.max(
            Number(page) || 1,
            1
        );

        const pageLimit = Math.min(
            Math.max(Number(limit) || 12, 1),
            100
        );

        const skip =
            (currentPage - 1) * pageLimit;

        const [
            courses,
            total,
        ] = await Promise.all([
            courseRepository.findPublishedCourses({
                search,
                skip,
                take: pageLimit,
            }),

            courseRepository.countPublishedCourses({
                search,
            }),
        ]);

        return {
            courses: courses.map((course) => ({
                id: course.id,
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                price: course.price,
                durationMonths:
                    course.durationMonths,

                teacher: course.teacher
                    ? {
                        id: course.teacher.id,
                        name: course.teacher.name,
                    }
                    : null,

                lessonCount:
                    course._count?.lessons || 0,
            })),

            pagination: {
                page: currentPage,
                limit: pageLimit,
                total,
                totalPages: Math.ceil(
                    total / pageLimit
                ),
            },
        };
    },

    /*
     * ==========================================
     * PUBLIC / STUDENT → GET COURSE DETAIL
     * ==========================================
     */

    async getCourseDetails(courseId) {
        const course =
            await courseRepository.findByIdWithDetails(
                courseId
            );

        if (!course) {
            throw new AppError(
                "Không tìm thấy khóa học.",
                404
            );
        }

        return {
            id: course.id,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            price: course.price,
            durationMonths:
                course.durationMonths,

            teacher: course.teacher
                ? {
                    id: course.teacher.id,
                    name: course.teacher.name,
                }
                : null,

            lessonCount:
                course._count?.lessons || 0,

            enrollmentCount:
                course._count?.enrollments || 0,

            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        };
    },

    /*
     * ==========================================
     * GET COURSE BY ID
     * ==========================================
     */

    async getCourseById(courseId) {
        const course =
            await courseRepository.findById(
                courseId
            );

        if (!course) {
            throw new AppError(
                "Không tìm thấy khóa học.",
                404
            );
        }

        return course;
    },

    /*
     * ==========================================
     * TEACHER → UPDATE COURSE
     * ==========================================
     */

    async updateCourse({
        courseId,
        teacherId,
        title,
        description,
        thumbnail,
        price,
        durationMonths,
        status,
    }) {
        /*
         * Check ownership
         *
         * Repository query:
         * courseId + teacherId + isDelete=false
         */
        const course =
            await courseRepository.findCourseByTeacher(
                courseId,
                teacherId
            );

        if (!course) {
            throw new AppError(
                "Không tìm thấy khóa học hoặc bạn không có quyền chỉnh sửa.",
                404
            );
        }

        /*
         * Prepare update data
         */
        const updateData = {};

        /*
         * Title
         */
        if (title !== undefined) {
            const trimmedTitle = title.trim();

            if (!trimmedTitle) {
                throw new AppError(
                    "Vui lòng nhập tên khóa học.",
                    400
                );
            }

            updateData.title = trimmedTitle;
        }

        /*
         * Description
         */
        if (description !== undefined) {
            updateData.description =
                description?.trim() || null;
        }

        /*
         * Price
         *
         * Đơn vị: nghìn đồng
         * 0 = miễn phí
         */
        if (price !== undefined) {
            const parsedPrice = Number(price);

            if (
                !Number.isInteger(parsedPrice) ||
                parsedPrice < 0
            ) {
                throw new AppError(
                    "Giá khóa học không hợp lệ.",
                    400
                );
            }

            updateData.price = parsedPrice;
        }

        /*
         * Duration
         *
         * Đơn vị: tháng
         * 0 = không giới hạn
         */
        if (durationMonths !== undefined) {
            const parsedDuration = Number(durationMonths);

            if (
                !Number.isInteger(parsedDuration) ||
                parsedDuration < 0
            ) {
                throw new AppError(
                    "Thời hạn khóa học không hợp lệ.",
                    400
                );
            }

            updateData.durationMonths = parsedDuration;
        }

        /*
         * Status
         *
         * FormData gửi lên dưới dạng string:
         * "true" / "false"
         *
         * true  = Mở
         * false = Khoá
         */
        if (status !== undefined) {
            if (
                status !== "true" &&
                status !== "false" &&
                typeof status !== "boolean"
            ) {
                throw new AppError(
                    "Trạng thái khóa học không hợp lệ.",
                    400
                );
            }

            updateData.status =
                typeof status === "boolean"
                    ? status
                    : status === "true";
        }

        /*
         * Thumbnail
         */
        if (thumbnail) {
            const uploaded = await storage.upload(
                thumbnail,
                "courses"
            );

            updateData.thumbnail = uploaded.url;
        }

        /*
         * Check nothing to update
         */
        if (Object.keys(updateData).length === 0) {
            throw new AppError(
                "Không có thông tin cần cập nhật.",
                400
            );
        }

        /*
         * Update database
         */
        const updatedCourse =
            await courseRepository.update(
                courseId,
                updateData
            );

        /*
         * Remove old thumbnail
         *
         * Chỉ xóa thumbnail cũ sau khi database
         * đã cập nhật thành công.
         */
        if (
            thumbnail &&
            course.thumbnail &&
            course.thumbnail !== updatedCourse.thumbnail
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

    /*
     * ==========================================
     * TEACHER → SOFT DELETE COURSE
     * ==========================================
     */

    async deleteCourse({
        courseId,
        teacherId,
    }) {
        /*
         * Check ownership
         */

        const course =
            await courseRepository.findCourseByTeacher(
                courseId,
                teacherId
            );

        if (!course) {
            throw new AppError(
                "Không tìm thấy khóa học hoặc bạn không có quyền xóa.",
                404
            );
        }

        /*
         * Soft delete
         */

        await courseRepository.softDelete(
            courseId
        );
    },

    /*
     * ==========================================
     * ADMIN → GET ACTIVE COURSES
     * ==========================================
     */

    async getActiveCourses({
        page = 1,
        limit = 20,
    } = {}) {
        const currentPage = Math.max(
            Number(page) || 1,
            1
        );

        const pageLimit = Math.min(
            Math.max(Number(limit) || 20, 1),
            100
        );

        const skip =
            (currentPage - 1) * pageLimit;

        const courses =
            await courseRepository.findActiveCourses({
                skip,
                take: pageLimit,
            });

        return {
            courses,
            pagination: {
                page: currentPage,
                limit: pageLimit,
            },
        };
    },

    /*
     * ==========================================
     * ADMIN → GET DELETED COURSES
     * ==========================================
     */

    async getDeletedCourses({
        page = 1,
        limit = 20,
    } = {}) {
        const currentPage = Math.max(
            Number(page) || 1,
            1
        );

        const pageLimit = Math.min(
            Math.max(Number(limit) || 20, 1),
            100
        );

        const skip =
            (currentPage - 1) * pageLimit;

        const courses =
            await courseRepository.findDeletedCourses({
                skip,
                take: pageLimit,
            });

        return {
            courses,
            pagination: {
                page: currentPage,
                limit: pageLimit,
            },
        };
    },

    /*
     * ==========================================
     * ADMIN → RESTORE COURSE
     * ==========================================
     */

    async restoreCourse(courseId) {
        const course =
            await courseRepository.findByIdIncludeDeleted(
                courseId
            );

        if (!course) {
            throw new AppError(
                "Không tìm thấy khóa học.",
                404
            );
        }

        if (!course.isDelete) {
            throw new AppError(
                "Khóa học đang hoạt động.",
                400
            );
        }

        await courseRepository.restore(
            courseId
        );
    },
};

export default courseService;