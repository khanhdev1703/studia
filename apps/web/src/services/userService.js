import userAPI from "../api/userAPI";

const userService = {
    searchTeachers: async (params = {}) => {
        const response = await userAPI.searchTeachers(params);
        return response.data;
    },
};

export default userService;