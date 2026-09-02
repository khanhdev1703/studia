// src/modules/learning/learning.service.js

import learningRepository from "./learning.repository.js";

const learningService = {

  async getMyCourses({ studentId }) {
    const enrollments =
      await learningRepository.findByStudentId(
        studentId
      );

    const courses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const totalLessons =
          await learningRepository.countLessonsByCourseId(
            enrollment.courseId
          );

        const completedLessonIds =
          await learningRepository.findCompletedLessonIdsByStudentAndCourse(
            {
              studentId,
              courseId: enrollment.courseId,
            }
          );

        const completedLessons =
          completedLessonIds.length;

        const progress =
          totalLessons > 0
            ? Math.round(
              (completedLessons /
                totalLessons) *
              100
            )
            : 0;

        return {
          ...enrollment,
          course: {
            ...enrollment.course,
            totalLessons,
            completedLessons,
            progress,
          },
        };
      })
    );

    return courses;
  },
  // ==========================================
  // Get course for learning
  // ==========================================

  async getCourseForLearning({
    courseId,
    studentId,
  }) {
    // ------------------------------------------
    // 1. Find course
    // ------------------------------------------

    const course =
      await learningRepository.findCourseById(
        courseId
      );

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 2. Check soft delete
    // ------------------------------------------

    if (course.isDelete) {
      const error = new Error(
        "Khóa học đã bị xóa."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 3. Check course status
    // true  = đang mở
    // false = tạm khóa
    // ------------------------------------------

    if (!course.status) {
      const error = new Error(
        "Khóa học hiện đang tạm khóa."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 4. Check enrollment
    // ------------------------------------------

    const enrollment =
      await learningRepository.findEnrollment({
        studentId,
        courseId,
      });

    if (!enrollment) {
      const error = new Error(
        "Bạn chưa tham gia khóa học này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 5. Check enrollment expiration
    // ------------------------------------------

    const now = new Date();

    if (enrollment.expiresAt <= now) {
      const error = new Error(
        "Thời hạn học khóa học đã hết."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 6. Get lessons
    // ------------------------------------------

    const lessons =
      await learningRepository.findLessonsByCourseId(
        courseId
      );

    // ------------------------------------------
    // 7. Get student's progress
    // ------------------------------------------

    const progressList =
      await learningRepository.findLessonProgressByCourse({
        studentId,
        courseId,
      });

    // ------------------------------------------
    // 8. Create progress map
    // ------------------------------------------

    const progressMap = new Map(
      progressList.map((progress) => [
        progress.lessonId,
        progress,
      ])
    );

    // ------------------------------------------
    // 9. Merge lesson + progress
    // ------------------------------------------

    const lessonsWithProgress =
      lessons.map((lesson) => {
        const progress =
          progressMap.get(lesson.id);

        return {
          ...lesson,

          // completedAt có giá trị
          // => bài học đã hoàn thành
          isCompleted:
            progress?.completedAt !== null &&
            progress?.completedAt !== undefined,

          completedAt:
            progress?.completedAt ?? null,

          lastAccessedAt:
            progress?.lastAccessedAt ?? null,
        };
      });

    // ------------------------------------------
    // 10. Find continue lesson
    // ------------------------------------------

    const continueLesson =
      lessonsWithProgress.find(
        (lesson) => !lesson.isCompleted
      );

    return {
      course,
      lessons: lessonsWithProgress,

      continueLessonId:
        continueLesson?.id ??
        lessonsWithProgress[0]?.id ??
        null,

      enrollment: {
        enrolledAt:
          enrollment.enrolledAt,

        expiresAt:
          enrollment.expiresAt,
      },
    };
  },

  // ==========================================
  // Access lesson
  // ==========================================

  async accessLesson({
    lessonId,
    studentId,
  }) {
    // ------------------------------------------
    // 1. Find lesson
    // ------------------------------------------

    const lesson =
      await learningRepository.findLessonById(
        lessonId
      );

    if (!lesson) {
      const error = new Error(
        "Không tìm thấy bài học."
      );
      error.statusCode = 404;
      throw error;
    }

    const course = lesson.course;

    // ------------------------------------------
    // 2. Check course
    // ------------------------------------------

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học của bài học."
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

    if (!course.status) {
      const error = new Error(
        "Khóa học hiện đang tạm khóa."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 3. Check enrollment
    // ------------------------------------------

    const enrollment =
      await learningRepository.findEnrollment({
        studentId,
        courseId: course.id,
      });

    if (!enrollment) {
      const error = new Error(
        "Bạn chưa tham gia khóa học này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 4. Check expiration
    // ------------------------------------------

    const now = new Date();

    if (enrollment.expiresAt <= now) {
      const error = new Error(
        "Thời hạn học khóa học đã hết."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 5. Find existing progress
    // ------------------------------------------

    const existingProgress =
      await learningRepository.findLessonProgress({
        studentId,
        lessonId,
      });

    // ------------------------------------------
    // 6. Progress already exists
    // ------------------------------------------

    if (existingProgress) {
      return learningRepository.updateLessonProgress({
        studentId,
        lessonId,
        data: {
          lastAccessedAt: now,
        },
      });
    }

    // ------------------------------------------
    // 7. Create progress
    // ------------------------------------------

    return learningRepository.createLessonProgress({
      studentId,
      lessonId,
      lastAccessedAt: now,
    });
  },

  // ==========================================
  // Complete lesson
  // ==========================================

  async completeLesson({
    lessonId,
    studentId,
  }) {
    // ------------------------------------------
    // 1. Find lesson
    // ------------------------------------------

    const lesson =
      await learningRepository.findLessonById(
        lessonId
      );

    if (!lesson) {
      const error = new Error(
        "Không tìm thấy bài học."
      );
      error.statusCode = 404;
      throw error;
    }

    const course = lesson.course;

    // ------------------------------------------
    // 2. Check course
    // ------------------------------------------

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học của bài học."
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

    if (!course.status) {
      const error = new Error(
        "Khóa học hiện đang tạm khóa."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 3. Check enrollment
    // ------------------------------------------

    const enrollment =
      await learningRepository.findEnrollment({
        studentId,
        courseId: course.id,
      });

    if (!enrollment) {
      const error = new Error(
        "Bạn chưa tham gia khóa học này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 4. Check expiration
    // ------------------------------------------

    const now = new Date();

    if (enrollment.expiresAt <= now) {
      const error = new Error(
        "Thời hạn học khóa học đã hết."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 5. Find existing progress
    // ------------------------------------------

    const existingProgress =
      await learningRepository.findLessonProgress({
        studentId,
        lessonId,
      });

    // ------------------------------------------
    // 6. Progress doesn't exist
    // ------------------------------------------

    if (!existingProgress) {
      return learningRepository.createLessonProgress({
        studentId,
        lessonId,
        completedAt: now,
        lastAccessedAt: now,
      });
    }

    // ------------------------------------------
    // 7. Already completed
    // ------------------------------------------

    if (existingProgress.completedAt) {
      return existingProgress;
    }

    // ------------------------------------------
    // 8. Mark as completed
    // ------------------------------------------

    return learningRepository.updateLessonProgress({
      studentId,
      lessonId,
      data: {
        completedAt: now,
        lastAccessedAt: now,
      },
    });
  },

  // ==========================================
  // Get course progress
  // ==========================================

  async getCourseProgress({
    courseId,
    studentId,
  }) {
    // ------------------------------------------
    // 1. Find course
    // ------------------------------------------

    const course =
      await learningRepository.findCourseById(
        courseId
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

    // ------------------------------------------
    // 2. Check enrollment
    // ------------------------------------------

    const enrollment =
      await learningRepository.findEnrollment({
        studentId,
        courseId,
      });

    if (!enrollment) {
      const error = new Error(
        "Bạn chưa tham gia khóa học này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 3. Check expiration
    // ------------------------------------------

    const now = new Date();

    if (enrollment.expiresAt <= now) {
      const error = new Error(
        "Thời hạn học khóa học đã hết."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 4. Get lessons
    // ------------------------------------------

    const lessons =
      await learningRepository.findLessonsByCourseId(
        courseId
      );

    // ------------------------------------------
    // 5. Get progress
    // ------------------------------------------

    const progressList =
      await learningRepository.findLessonProgressByCourse({
        studentId,
        courseId,
      });

    // ------------------------------------------
    // 6. Calculate progress
    // ------------------------------------------

    const completedLessonIds = new Set(
      progressList
        .filter(
          (progress) =>
            progress.completedAt !== null
        )
        .map(
          (progress) =>
            progress.lessonId
        )
    );

    const totalLessons = lessons.length;

    const completedLessons =
      completedLessonIds.size;

    const progress =
      totalLessons > 0
        ? Math.round(
          (completedLessons /
            totalLessons) *
          100
        )
        : 0;

    return {
      courseId,
      totalLessons,
      completedLessons,
      progress,
    };
  },

  // ==========================================
  // Get lesson progress
  // ==========================================

  async getLessonProgress({
    lessonId,
    studentId,
  }) {
    // ------------------------------------------
    // 1. Find lesson
    // ------------------------------------------

    const lesson =
      await learningRepository.findLessonById(
        lessonId
      );

    if (!lesson) {
      const error = new Error(
        "Không tìm thấy bài học."
      );
      error.statusCode = 404;
      throw error;
    }

    const course = lesson.course;

    // ------------------------------------------
    // 2. Check course
    // ------------------------------------------

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học của bài học."
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

    // ------------------------------------------
    // 3. Check enrollment
    // ------------------------------------------

    const enrollment =
      await learningRepository.findEnrollment({
        studentId,
        courseId: course.id,
      });

    if (!enrollment) {
      const error = new Error(
        "Bạn chưa tham gia khóa học này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 4. Check expiration
    // ------------------------------------------

    const now = new Date();

    if (enrollment.expiresAt <= now) {
      const error = new Error(
        "Thời hạn học khóa học đã hết."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 5. Get progress
    // ------------------------------------------

    const progress =
      await learningRepository.findLessonProgress({
        studentId,
        lessonId,
      });

    return {
      lessonId,

      isCompleted:
        progress?.completedAt !== null &&
        progress?.completedAt !== undefined,

      completedAt:
        progress?.completedAt ?? null,

      lastAccessedAt:
        progress?.lastAccessedAt ?? null,
    };
  },
};

export default learningService;