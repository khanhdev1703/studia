import enrollmentRepository from "../enrollments/enrollment.repository.js";
import courseRepository from "../courses/course.repository.js";
import lessonRepository from "../lessons/lesson.repository.js"
import learningRepository from "./learning.repository.js";

const learningService = {
  async getCourseForLearning(studentId, courseId) {
    // 1. Kiểm tra course
    const course = await courseRepository.findById(courseId);

    if (!course) {
      throw new Error("Không tìm thấy khóa học.");
    }

    if (course.status !== "PUBLISHED") {
      throw new Error("Khóa học chưa được phát hành.");
    }

    // 2. Kiểm tra student đã enroll course
    const enrollment =
      await enrollmentRepository.findByStudentAndCourse(
        studentId,
        courseId
      );

    if (!enrollment) {
      throw new Error(
        "Bạn chưa đăng ký khóa học này."
      );
    }

    // 3. Lấy lessons của course
    const lessons =
      await lessonRepository.findByCourseId(
        courseId
      );

    // 4. Lấy progress của student
    const lessonIds = lessons.map(
      (lesson) => lesson.id
    );

    const progresses =
      lessonIds.length > 0
        ? await learningRepository.findProgressByStudent(
          studentId,
          lessonIds
        )
        : [];

    // 5. Map progress theo lessonId
    const progressMap = new Map(
      progresses.map((progress) => [
        progress.lessonId,
        progress,
      ])
    );

    // 6. Gắn progress vào lesson
    const resultLessons = lessons.map((lesson) => {
      const progress = progressMap.get(
        lesson.id
      );

      return {
        ...lesson,
        isCompleted:
          progress?.isCompleted ?? false,
        lastAccessedAt:
          progress?.lastAccessedAt ?? null,
      };
    });

    // 7. Tìm lesson được access gần nhất
    const lastAccessedLesson =
      resultLessons
        .filter(
          (lesson) =>
            lesson.lastAccessedAt !== null
        )
        .sort(
          (a, b) =>
            new Date(b.lastAccessedAt) -
            new Date(a.lastAccessedAt)
        )[0] || null;

    // 8. Xác định lesson sẽ tiếp tục học
    let continueLesson = null;

    if (lastAccessedLesson) {
      // Bài được access gần nhất chưa hoàn thành
      if (!lastAccessedLesson.isCompleted) {
        continueLesson = lastAccessedLesson;
      } else {
        // Bài gần nhất đã hoàn thành.
        // Vì không học theo thứ tự nên chọn
        // một bài chưa hoàn thành bất kỳ.
        continueLesson =
          resultLessons.find(
            (lesson) =>
              !lesson.isCompleted
          ) || null;
      }
    } else {
      // Student chưa từng access lesson nào.
      // Chọn bài đầu tiên.
      continueLesson =
        resultLessons[0] || null;
    }

    return {
      course,
      lessons: resultLessons,
      continueLessonId:
        continueLesson?.id ?? null,
    };
  },

  async accessLesson(studentId, lessonId) {
    console.log("acees lesong serive");

    // 1. Kiểm tra lesson có tồn tại không
    const lesson =
      await lessonRepository.findById(lessonId);

    if (!lesson) {
      throw new Error("Không tìm thấy bài học.");
    }

    // 2. Kiểm tra student đã đăng ký khóa học chưa
    const enrollment =
      await enrollmentRepository.findByStudentAndCourse(
        studentId,
        lesson.courseId
      );

    if (
      !enrollment ||
      enrollment.status !== "APPROVED"
    ) {
      throw new Error(
        "Bạn chưa được phép học khóa học này."
      );
    }

    // 3. Cập nhật thời điểm truy cập gần nhất
    return learningRepository.updateLessonProgress(
      studentId,
      lessonId,
      {
        lastAccessedAt: new Date(),
      }
    );
  },

  async completeLesson(studentId, lessonId) {
    // 1. Kiểm tra lesson có tồn tại không
    const lesson =
      await lessonRepository.findById(lessonId);

    if (!lesson) {
      throw new Error("Không tìm thấy bài học.");
    }

    // 2. Kiểm tra student đã đăng ký khóa học chưa
    const enrollment =
      await enrollmentRepository.findByStudentAndCourse(
        studentId,
        lesson.courseId
      );

    if (!enrollment) {
      throw new Error(
        "Bạn chưa đăng ký khóa học này."
      );
    }

    // 3. Đánh dấu lesson đã hoàn thành
    return learningRepository.updateLessonProgress(
      studentId,
      lessonId,
      {
        isCompleted: true,
      }
    );
  }
};

export default learningService;