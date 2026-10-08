// src/modules/enrollments/enrollment.service.js

import enrollmentRepository from "./enrollment.repository.js";
import courseRepository from "../courses/course.repository.js";
import userRepository from "../users/user.repository.js";

const enrollmentService = {

    // ==========================================
    // Get students enrolled in a course
    // ==========================================

    async getEnrollmentsByCourse({
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

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );
            error.statusCode = 404;
            throw error;
        }

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền xem danh sách học sinh của khóa học này."
            );
            error.statusCode = 403;
            throw error;
        }

        const enrollments =
            await enrollmentRepository.findByCourseId(
                courseId
            );

        return enrollments;
    },

    // ==========================================
    // Enroll student into course
    // ==========================================

    async enrollStudent({
        courseId,
        studentCode,
        teacherId,
        expiresAt: requestedExpiresAt,
    }) {
        // ------------------------------------------
        // Find course
        // ------------------------------------------
        const course =
            await courseRepository.findById(courseId);

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        // ------------------------------------------
        // Check deleted course
        // ------------------------------------------
        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );
            error.statusCode = 404;
            throw error;
        }

        // ------------------------------------------
        // Check teacher ownership
        // ------------------------------------------
        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền thêm học sinh vào khóa học này."
            );
            error.statusCode = 403;
            throw error;
        }

        // ------------------------------------------
        // Validate course duration
        // ------------------------------------------
        if (
            !Number.isInteger(course.durationMonths) ||
            course.durationMonths <= 0
        ) {
            const error = new Error(
                "Khóa học chưa được thiết lập thời hạn."
            );
            error.statusCode = 400;
            throw error;
        }

        // ------------------------------------------
        // Find student
        // ------------------------------------------
        const student =
            await userRepository.findByCode(studentCode);

        if (!student) {
            const error = new Error(
                "Không tìm thấy học sinh."
            );
            error.statusCode = 404;
            throw error;
        }

        // ------------------------------------------
        // Check student role
        // ------------------------------------------
        if (student.role !== "STUDENT") {
            const error = new Error(
                "Người dùng được chọn không phải là học sinh."
            );
            error.statusCode = 400;
            throw error;
        }

        // ------------------------------------------
        // Check existing enrollment
        // ------------------------------------------
        const existingEnrollment =
            await enrollmentRepository.findByStudentAndCourse({
                studentId: student.id,
                courseId,
            });

        if (existingEnrollment) {
            const error = new Error(
                "Học sinh đã tham gia khóa học này."
            );
            error.statusCode = 409;
            throw error;
        }

        // ------------------------------------------
        // Calculate enrollment dates
        // ------------------------------------------
        const enrolledAt = new Date();

        let finalExpiresAt;

        if (requestedExpiresAt) {
            // FE gửi dạng yyyy-MM-dd
            const parsedExpiresAt = new Date(
                `${requestedExpiresAt}T23:59:59`
            );

            // ------------------------------------------
            // Validate expiration date
            // ------------------------------------------
            if (Number.isNaN(parsedExpiresAt.getTime())) {
                const error = new Error(
                    "Ngày hết hạn không hợp lệ."
                );
                error.statusCode = 400;
                throw error;
            }

            // ------------------------------------------
            // Expiration must be after enrollment
            // ------------------------------------------
            if (parsedExpiresAt <= enrolledAt) {
                const error = new Error(
                    "Ngày hết hạn phải sau ngày tham gia."
                );
                error.statusCode = 400;
                throw error;
            }

            // Giáo viên có thể tùy chỉnh ngày hết hạn,
            // không giới hạn bởi durationMonths.
            finalExpiresAt = parsedExpiresAt;
        } else {
            // ------------------------------------------
            // Default expiration
            // ------------------------------------------
            // Nếu FE không gửi expiresAt,
            // backend tự tính theo durationMonths.
            finalExpiresAt = new Date(enrolledAt);

            finalExpiresAt.setMonth(
                finalExpiresAt.getMonth() + course.durationMonths
            );
        }

        // ------------------------------------------
        // Create enrollment
        // ------------------------------------------
        const enrollment =
            await enrollmentRepository.create({
                studentId: student.id,
                courseId,
                enrolledAt,
                expiresAt: finalExpiresAt,
            });

        // ------------------------------------------
        // Return formatted data
        // ------------------------------------------
        return {
            id: enrollment.id,
            studentId: enrollment.studentId,
            studentName: student.name,
            studentEmail: student.email,
            courseId: enrollment.courseId,
            enrolledAt: enrollment.enrolledAt,
            expiresAt: enrollment.expiresAt,
        };
    },

    // ==========================================
    // Get enrollment by ID
    // ==========================================

    async getEnrollmentById({
        enrollmentId,
        teacherId,
    }) {
        const enrollment =
            await enrollmentRepository.findById(
                enrollmentId
            );

        if (!enrollment) {
            const error = new Error(
                "Không tìm thấy thông tin tham gia khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        const course =
            await courseRepository.findById(
                enrollment.courseId
            );

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );
            error.statusCode = 404;
            throw error;
        }

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền xem thông tin này."
            );
            error.statusCode = 403;
            throw error;
        }

        return enrollment;
    },

    // ==========================================
    // Update enrollment expiration
    // ==========================================

    async updateExpiration({
        enrollmentId,
        teacherId,
        durationMonths,
    }) {
        if (
            !Number.isInteger(durationMonths) ||
            durationMonths <= 0
        ) {
            const error = new Error(
                "Thời hạn khóa học không hợp lệ."
            );
            error.statusCode = 400;
            throw error;
        }

        const enrollment =
            await enrollmentRepository.findById(
                enrollmentId
            );

        if (!enrollment) {
            const error = new Error(
                "Không tìm thấy thông tin tham gia khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        const course =
            await courseRepository.findById(
                enrollment.courseId
            );

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );
            error.statusCode = 404;
            throw error;
        }

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền thay đổi thời hạn của học sinh này."
            );
            error.statusCode = 403;
            throw error;
        }

        const expiresAt = new Date(
            enrollment.enrolledAt
        );

        expiresAt.setMonth(
            expiresAt.getMonth() + durationMonths
        );

        const updatedEnrollment =
            await enrollmentRepository.updateById(
                enrollmentId,
                {
                    expiresAt,
                }
            );

        return updatedEnrollment;
    },

    // ==========================================
    // Remove student from course
    // ==========================================

    async removeEnrollment({
        enrollmentId,
        teacherId,
    }) {
        const enrollment =
            await enrollmentRepository.findById(
                enrollmentId
            );

        if (!enrollment) {
            const error = new Error(
                "Không tìm thấy thông tin tham gia khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        const course =
            await courseRepository.findById(
                enrollment.courseId
            );

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );
            error.statusCode = 404;
            throw error;
        }

        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền xóa học sinh khỏi khóa học này."
            );
            error.statusCode = 403;
            throw error;
        }

        const deletedEnrollment =
            await enrollmentRepository.deleteById(
                enrollmentId
            );

        return deletedEnrollment;
    },

    // ==========================================
    // Check student enrollment status
    // ==========================================

    async checkEnrollment({
        courseId,
        studentCode,
        teacherId,
    }) {
        // ------------------------------------------
        // Validate student code
        // ------------------------------------------
        if (!studentCode || !studentCode.trim()) {
            const error = new Error(
                "Vui lòng nhập mã học sinh."
            );
            error.statusCode = 400;
            throw error;
        }

        // ------------------------------------------
        // Find course
        // ------------------------------------------
        const course =
            await courseRepository.findById(courseId);

        if (!course) {
            const error = new Error(
                "Không tìm thấy khóa học."
            );
            error.statusCode = 404;
            throw error;
        }

        // ------------------------------------------
        // Check deleted course
        // ------------------------------------------
        if (course.isDelete) {
            const error = new Error(
                "Khóa học đã bị xóa."
            );
            error.statusCode = 404;
            throw error;
        }

        // ------------------------------------------
        // Check teacher ownership
        // ------------------------------------------
        if (course.teacherId !== teacherId) {
            const error = new Error(
                "Bạn không có quyền kiểm tra học sinh của khóa học này."
            );
            error.statusCode = 403;
            throw error;
        }

        // ------------------------------------------
        // Validate course duration
        // Chỉ cần cho trường hợp chưa tham gia
        // ------------------------------------------
        if (
            !Number.isInteger(course.durationMonths) ||
            course.durationMonths <= 0
        ) {
            const error = new Error(
                "Khóa học chưa được thiết lập thời hạn."
            );
            error.statusCode = 400;
            throw error;
        }

        // ------------------------------------------
        // Find student
        // ------------------------------------------
        const student =
            await userRepository.findByCode(
                studentCode.trim()
            );

        if (!student) {
            const error = new Error(
                "Không tìm thấy học sinh."
            );
            error.statusCode = 404;
            throw error;
        }

        // ------------------------------------------
        // Check student role
        // ------------------------------------------
        if (student.role !== "STUDENT") {
            const error = new Error(
                "Người dùng được chọn không phải là học sinh."
            );
            error.statusCode = 400;
            throw error;
        }

        // ------------------------------------------
        // Find existing enrollment
        // ------------------------------------------
        const enrollment =
            await enrollmentRepository.findByStudentAndCourse({
                studentId: student.id,
                courseId,
            });

        // ------------------------------------------
        // Base student information
        // ------------------------------------------
        const studentData = {
            id: student.id,
            studentCode: student.studentCode,
            name: student.name,
            email: student.email,
        };

        // ------------------------------------------
        // Chưa tham gia
        // ------------------------------------------
        if (!enrollment) {
            const now = new Date();

            const nextExpiresAt = new Date(now);

            nextExpiresAt.setMonth(
                nextExpiresAt.getMonth() +
                course.durationMonths
            );

            return {
                student: studentData,

                status: "NOT_ENROLLED",

                enrollment: null,

                prediction: {
                    durationMonths:
                        course.durationMonths,

                    nextExpiresAt,
                },
            };
        }

        // ------------------------------------------
        // Enrollment information
        // ------------------------------------------
        const enrollmentData = {
            id: enrollment.id,
            enrolledAt: enrollment.enrolledAt,
            expiresAt: enrollment.expiresAt,
        };

        // ------------------------------------------
        // Calculate status
        // ------------------------------------------
        const now = new Date();

        if (enrollment.expiresAt > now) {
            // --------------------------------------
            // Đang tham gia
            // --------------------------------------

            return {
                student: studentData,

                status: "ACTIVE",

                enrollment: enrollmentData,

                prediction: null,
            };
        }

        // ------------------------------------------
        // Hết hạn
        // ------------------------------------------

        return {
            student: studentData,

            status: "EXPIRED",

            enrollment: enrollmentData,

            prediction: null,
        };
    },
};

export default enrollmentService;