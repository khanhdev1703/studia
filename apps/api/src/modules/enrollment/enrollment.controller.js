import enrollmentService from "./enrollment.service.js";

const enrollmentController = {
    // ==========================================
    // Student - Đăng ký khóa học
    // POST /enrollment/:courseId
    // ==========================================

    async enroll(req, res) {
        try {
            const { courseId } = req.params;
            const userId = req.user.userId;
            const enrollment =
                await enrollmentService.enroll(
                    userId,
                    courseId
                );

            return res.status(201).json({
                success: true,
                message: "Đăng ký khóa học thành công.",
                data: enrollment,
            });
        } catch (error) {
            console.error(
                "Enroll course error:",
                error
            );

            return res.status(
                error.statusCode || 400
            ).json({
                success: false,
                message:
                    error.message ||
                    "Không thể đăng ký khóa học.",
            });
        }
    },

    // ==========================================
    // Student - Lấy enrollment của course
    // GET /enrollment/course/:courseId
    // ==========================================

    async getByCourse(req, res) {
        try {
            const { courseId } = req.params;
            const userId = req.user.userId;

            const enrollment =
                await enrollmentService.getByCourse(
                    userId,
                    courseId
                );

            return res.status(200).json({
                success: true,
                message:
                    "Lấy trạng thái đăng ký thành công.",
                data: enrollment,
            });
        } catch (error) {
            console.error(
                "Get enrollment by course error:",
                error
            );

            return res.status(
                error.statusCode || 400
            ).json({
                success: false,
                message:
                    error.message ||
                    "Không thể lấy trạng thái đăng ký.",
            });
        }
    },

    // ==========================================
    // Student - Lấy danh sách enrollment
    // GET /enrollment/me
    // ==========================================

    async getMyEnrollments(req, res) {
        try {
            const userId = req.user.userId;

            const { status } = req.query;

            const result =
                await enrollmentService.getMyEnrollments(
                    userId,
                    { status }
                );

            return res.status(200).json({
                success: true,
                message:
                    "Lấy danh sách khóa học thành công.",
                data: result,
            });
        } catch (error) {
            console.error(
                "Get my enrollments error:",
                error
            );

            return res.status(
                error.statusCode || 400
            ).json({
                success: false,
                message:
                    error.message ||
                    "Không thể lấy danh sách khóa học.",
            });
        }
    },

    // ==========================================
    // Student - Hủy đăng ký
    // DELETE /enrollment/:courseId
    // ==========================================

    async cancel(req, res) {
        try {
            const { courseId } = req.params;
            const userId = req.user.userId;

            const enrollment =
                await enrollmentService.cancel(
                    userId,
                    courseId
                );

            return res.status(200).json({
                success: true,
                message:
                    "Đã hủy đăng ký khóa học.",
                data: enrollment,
            });
        } catch (error) {
            console.error(
                "Cancel enrollment error:",
                error
            );

            return res.status(
                error.statusCode || 400
            ).json({
                success: false,
                message:
                    error.message ||
                    "Không thể hủy đăng ký khóa học.",
            });
        }
    },

    // ==========================================
    // Teacher - Lấy danh sách enrollment
    // GET /enrollment/teacher/course/:courseId
    // ==========================================

    async getTeacherPendingRequests(req, res, next) {
        try {
            const teacherId = req.user.userId;

            const requests =
                await enrollmentService.getTeacherPendingRequests(
                    teacherId
                );

            res.status(200).json({
                success: true,
                message: "Lấy yêu cầu đăng ký thành công.",
                data: requests.map(request => ({ ...request, type: "ENROLLMENT_REQUEST" })),
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // Teacher - Approve
    // PATCH /enrollment/:enrollmentId/approve
    // ==========================================

    async approve(req, res) {
        try {
            const { enrollmentId } = req.params;
            const teacherId = req.user.userId;

            const enrollment =
                await enrollmentService.approve(
                    teacherId,
                    enrollmentId
                );

            return res.status(200).json({
                success: true,
                message:
                    "Duyệt đăng ký khóa học thành công.",
                data: enrollment,
            });
        } catch (error) {
            console.error(
                "Approve enrollment error:",
                error
            );

            return res.status(
                error.statusCode || 400
            ).json({
                success: false,
                message:
                    error.message ||
                    "Không thể duyệt đăng ký.",
            });
        }
    },

    // ==========================================
    // Teacher - Reject
    // PATCH /enrollment/:enrollmentId/reject
    // ==========================================

    async reject(req, res) {
        try {
            const { enrollmentId } = req.params;
            const teacherId = req.user.userId;

            const enrollment =
                await enrollmentService.reject(
                    teacherId,
                    enrollmentId
                );

            return res.status(200).json({
                success: true,
                message:
                    "Từ chối đăng ký khóa học thành công.",
                data: enrollment,
            });
        } catch (error) {
            console.error(
                "Reject enrollment error:",
                error
            );

            return res.status(
                error.statusCode || 400
            ).json({
                success: false,
                message:
                    error.message ||
                    "Không thể từ chối đăng ký.",
            });
        }
    },
};

export default enrollmentController;