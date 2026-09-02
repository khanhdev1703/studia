import courseAPI from "../api/courseAPI";

const courseService = {
    // ==============================
    // PUBLIC
    // ==============================

    // Tìm kiếm khóa học đang mở
    async searchPublishedCourses({ search, page, limit } = {}) {
        const response = await courseAPI.searchPublishedCoursesApi({
            search,
            page,
            limit,
        });

        return response.data;
    },

    // Lấy chi tiết khóa học
    async getCourseDetails(courseId) {
        const response = await courseAPI.getCourseDetailsApi(courseId);
        return response.data;
    },


    // ==============================
    // TEACHER
    // ==============================

    // Tạo khóa học
    async createCourse(data) {
        const response = await courseAPI.createCourseApi(data);

        return response.data;
    },

    // Lấy danh sách khóa học của Teacher hiện tại
    async getMyCourses({ page, limit } = {}) {
        const response = await courseAPI.getMyCoursesApi({
            page,
            limit,
        });



        return response.data;
    },

    // Cập nhật khóa học
    async updateCourse(courseId, data) {
        const response = await courseAPI.updateCourseApi(
            courseId,
            data
        );

        return response.data;
    },

    // Xóa mềm khóa học
    async deleteCourse(courseId) {
        const response = await courseAPI.deleteCourseApi(courseId);

        return response.data;
    },


    // ==============================
    // ADMIN
    // ==============================

    // Lấy danh sách khóa học đang hoạt động
    async getActiveCourses({ page, limit } = {}) {
        const response = await courseAPI.getActiveCoursesApi({
            page,
            limit,
        });

        return response.data;
    },

    // Lấy danh sách khóa học đã xóa
    async getDeletedCourses({ page, limit } = {}) {
        const response = await courseAPI.getDeletedCoursesApi({
            page,
            limit,
        });

        return response.data;
    },

    // Khôi phục khóa học
    async restoreCourse(courseId) {
        const response = await courseAPI.restoreCourseApi(courseId);

        return response.data;
    },
};

export default courseService;