import enrollmentRepository from "./enrollment.repository.js";

const enrollmentService = {
    // ==========================================
    // Đăng ký khóa học
    // ==========================================
    async enroll(studentId, courseId) {
        console.log(studentId, courseId);

        // Kiểm tra enrollment cũ
        const existingEnrollment =
            await enrollmentRepository.findByStudentAndCourse(
                studentId,
                courseId
            );

        console.log("ABC", existingEnrollment);

        // Nếu đã tồn tại và đang ACTIVE
        if (
            existingEnrollment &&
            (existingEnrollment.status === "ACTIVE" || existingEnrollment.status === "PENDING")
        ) {
            throw new Error(
                "Bạn đã đăng ký khóa học này."
            );
        }

        // Nếu enrollment cũ đã bị soft delete / INACTIVE
        if (existingEnrollment) {
            return enrollmentRepository.reactivate(
                existingEnrollment.id
            );
        }

        // Chưa từng đăng ký
        return enrollmentRepository.create({
            studentId,
            courseId,
        });
    },

    // ==========================================
    // Lấy enrollment của user với course
    // ==========================================
    async getByCourse(userId, courseId) {
        return enrollmentRepository.findByUserAndCourse(
            userId,
            courseId
        );
    },

    // ==========================================
    // Hủy đăng ký
    // ==========================================
    async cancel(userId, courseId) {
        const enrollment =
            await enrollmentRepository.findByStudentAndCourse(
                userId,
                courseId
            );


        if (!enrollment) {
            const error = new Error(
                "Bạn chưa đăng ký khóa học này."
            );
            error.statusCode = 404;
            throw error;
        }

        if (enrollment.status === "REJECTED") {
            const error = new Error(
                "Đăng ký khóa học này đã bị từ chối."
            );
            error.statusCode = 400;
            throw error;
        }

        if (enrollment.status === "ACTIVE") {
            const error = new Error(
                "Bạn đã được duyệt vào khóa học, không thể huỷ đăng ký."
            );
            error.statusCode = 400;
            throw error;
        }

        if (enrollment.status !== "PENDING") {
            const error = new Error(
                "Không thể huỷ đăng ký khóa học này."
            );
            error.statusCode = 400;
            throw error;
        }

        return enrollmentRepository.cancel(enrollment.id);
    },
    async approve(teacherId, enrollmentId) {
        const enrollment =
            await enrollmentRepository.findById(
                enrollmentId
            );

        if (!enrollment) {
            throw new Error(
                "Không tìm thấy yêu cầu đăng ký."
            );
        }

        if (
            enrollment.course.teacherId !==
            teacherId
        ) {
            throw new Error(
                "Bạn không có quyền duyệt yêu cầu này."
            );
        }

        if (enrollment.status !== "PENDING") {
            throw new Error(
                "Yêu cầu đăng ký không còn ở trạng thái chờ duyệt."
            );
        }

        return enrollmentRepository.approve(
            enrollmentId
        );
    },
    async reject(
        teacherId,
        enrollmentId
    ) {
        const enrollment =
            await enrollmentRepository.findById(
                enrollmentId
            );

        if (!enrollment) {
            throw new Error(
                "Không tìm thấy yêu cầu đăng ký."
            );
        }

        if (
            enrollment.course.teacherId !==
            teacherId
        ) {
            throw new Error(
                "Bạn không có quyền xử lý yêu cầu này."
            );
        }

        if (enrollment.status !== "PENDING") {
            throw new Error(
                "Yêu cầu đăng ký không còn ở trạng thái chờ duyệt."
            );
        }

        return enrollmentRepository.cancel(
            enrollmentId
        );
    },

    async getTeacherPendingRequests(teacherId) {
        return enrollmentRepository.findPendingByTeacher(
            teacherId
        );
    },

    async getMyEnrollments(userId, filters = {}) {
        const { status } = filters;

        return enrollmentRepository.findByStudent(
            userId,
            { status }
        );
    },


};

export default enrollmentService;