// src/services/lessonService.js

import lessonAPI from "../api/lessonAPI";

const lessonService = {
    getByCourse: async (courseId) => {
        const response =
            await lessonAPI.getByCourse(courseId);

        return response.data;
    },

    getById: async (lessonId) => {
        const response =
            await lessonAPI.getById(lessonId);

        return response.data;
    },

    create: async (courseId, data) => {
        const response =
            await lessonAPI.create(courseId, data);

        return response.data;
    },

    update: async (lessonId, data) => {
        const response =
            await lessonAPI.update(lessonId, data);

        return response.data;
    },

    delete: async (lessonId) => {
        const response =
            await lessonAPI.delete(lessonId);

        return response.data;
    },

    reorder: async (courseId, lessons) => {
        const response =
            await lessonAPI.reorder(courseId, lessons);

        return response.data;
    },
};

export default lessonService;