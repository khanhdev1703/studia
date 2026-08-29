import enrollmentRepository from "../enrollment/enrollment.repository.js";
import courseRepository from "../course/course.repository.js";

const learningService = {
  async getCourseForLearning(studentId, courseId) {
    // 1. Kiểm tra học sinh đã đăng ký khóa học chưa
    const enrollment =
      await enrollmentRepository.findByStudentAndCourse(
        studentId,
        courseId
      );

    if (!enrollment) {
      const error = new Error(
        "Bạn chưa đăng ký khóa học này."
      );

      error.statusCode = 403;

      throw error;
    }

    // 2. Chỉ được học khi enrollment đã được duyệt
    if (enrollment.status !== "APPROVED") {
      const error = new Error(
        "Bạn chưa được phép học khóa học này."
      );

      error.statusCode = 403;

      throw error;
    }

    // 3. Lấy khóa học + giáo viên + danh sách bài học
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

    // 4. Trả dữ liệu cần thiết cho trang học
    return {
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,

        teacher: course.teacher,
      },

      lessons: course.lessons,
    };
  },
};

export default learningService;