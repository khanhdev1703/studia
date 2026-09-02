import userAPI from "../api/userAPI";
import useAuthStore from "../stores/authStore";

const userService = {
    searchTeachers: async (params = {}) => {
        const response = await userAPI.searchTeachers(params);
        return response.data;
    },
    getMe: async () => {
        const response = await userAPI.getMeApi();

        const { success, message, data } = response.data;

        if (!success || !data) {
            throw new Error(
                message ||
                "Không thể lấy thông tin người dùng."
            );
        }


        useAuthStore
            .getState()
            .setUser(data);

        return {
            message,
            data,
        };
    }
};

export default userService;