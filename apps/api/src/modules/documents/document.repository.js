// src/modules/documents/document.repository.js

import { prisma } from "../../config/database.js";

const documentRepository = {
  // ==========================================
  // Get documents by lesson
  // ==========================================

  async findByLessonId(lessonId) {
    return prisma.lessonDocument.findMany({
      where: {
        lessonId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },

  // ==========================================
  // Find document by ID
  // ==========================================

  async findById(id) {
    return prisma.lessonDocument.findUnique({
      where: {
        id,
      },
    });
  },

  // ==========================================
  // Create document
  // ==========================================

  async create(data) {
    return prisma.lessonDocument.create({
      data,
    });
  },

  // ==========================================
  // Delete document
  // ==========================================

  async deleteById(id) {
    return prisma.lessonDocument.delete({
      where: {
        id,
      },
    });
  },
};

export default documentRepository;