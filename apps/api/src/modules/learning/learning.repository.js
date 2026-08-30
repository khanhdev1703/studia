import { prisma } from "../../config/database.js";

const learningRepository = {
  /**
   * Tạo hoặc cập nhật tiến độ học của student cho một lesson.
   *
   * Dùng cho:
   * - Access lesson
   * - Complete lesson
   */
  async updateLessonProgress(studentId, lessonId, data) {
    return prisma.lessonProgress.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId,
        },
      },
      create: {
        studentId,
        lessonId,
        ...data,
      },
      update: {
        ...data,
      },
    });
  },

  /**
   * Lấy progress của một student cho một lesson.
   */
  async findLessonProgress(studentId, lessonId) {
    return prisma.lessonProgress.findUnique({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId,
        },
      },
    });
  },

  /**
   * Lấy toàn bộ progress của student trong một course.
   *
   * Service sẽ quyết định course/lesson nào cần lấy.
   */
  async findProgressByStudent(studentId, lessonIds) {
    return prisma.lessonProgress.findMany({
      where: {
        studentId,
        lessonId: {
          in: lessonIds,
        },
      },
      orderBy: {
        lastAccessedAt: "desc",
      },
    });
  },
};

export default learningRepository;