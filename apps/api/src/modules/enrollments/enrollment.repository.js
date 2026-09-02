// src/modules/enrollments/enrollment.repository.js

import { prisma } from "../../config/database.js";

const enrollmentRepository = {
    // ==========================================
    // Find enrollment by ID
    // ==========================================

    async findById(id) {
        return prisma.enrollment.findUnique({
            where: {
                id,
            },
        });
    },

    // ==========================================
    // Find enrollment by student + course
    // Dùng để kiểm tra học sinh đã tham gia khóa học chưa
    // ==========================================

    async findByStudentAndCourse({
        studentId,
        courseId,
    }) {
        return prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
    },

    // ==========================================
    // Get all enrollments of a course
    // ==========================================

    async findByCourseId(courseId) {
        return prisma.enrollment.findMany({
            where: {
                courseId,
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                enrolledAt: "desc",
            },
        });
    },

    // ==========================================
    // Get all enrollments of a student
    // ==========================================

    async findByStudentId(studentId) {
        return prisma.enrollment.findMany({
            where: {
                studentId,
            },
            include: {
                course: true,
            },
            orderBy: {
                enrolledAt: "desc",
            },
        });
    },

    // ==========================================
    // Create enrollment
    // ==========================================

    async create(data) {
        return prisma.enrollment.create({
            data,
        });
    },

    // ==========================================
    // Update enrollment
    // ==========================================

    async updateById(id, data) {
        return prisma.enrollment.update({
            where: {
                id,
            },
            data,
        });
    },

    // ==========================================
    // Delete enrollment
    // ==========================================

    async deleteById(id) {
        return prisma.enrollment.delete({
            where: {
                id,
            },
        });
    },

    // ==========================================
    // Count enrollments of a course
    // ==========================================

    async countByCourseId(courseId) {
        return prisma.enrollment.count({
            where: {
                courseId,
            },
        });
    },

    // ==========================================
    // Count enrollments of a student
    // ==========================================

    async countByStudentId(studentId) {
        return prisma.enrollment.count({
            where: {
                studentId,
            },
        });
    },
};

export default enrollmentRepository;