import courseAPI from "../api/courseAPI";

const courseService = {
    async getTeacherCourses() {
        const response = await courseAPI.getTeacherCourses();

        return response.data;
    },

    async getCourseById(courseId) {
        const response = await courseAPI.getCourseById(
            courseId
        );

        return response.data;
    },

    async createCourse(data) {
        const response = await courseAPI.createCourse(data);

        return response.data;
    },

    async updateCourse(courseId, data) {
        const response = await courseAPI.updateCourse(
            courseId,
            data
        );

        return response.data;
    },

    async deleteCourse(courseId) {
        const response = await courseAPI.deleteCourse(
            courseId
        );

        return response.data;
    },
};

export default courseService;