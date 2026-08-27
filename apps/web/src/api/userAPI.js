import apiClient from "./apiClient";

const userAPI = {
    // Search teachers
    searchTeachers: (params) => {
        return apiClient.get("/user/teachers", {
            params,
        });
    },

    // Search students
    searchStudents: (params) => {
        return apiClient.get("/users/students", {
            params,
        });
    },
};

export default userAPI;