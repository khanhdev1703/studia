import apiClient from "./apiClient";

const userAPI = {
    // Lấy thông tin user hiện tại
    getMeApi: () => {
        return apiClient.get("/users/me");
    },

    // Cập nhật thông tin cá nhân
    updateMeApi: (data) => {
        return apiClient.put("/users/me", data);
    },

    // Đổi mật khẩu
    changePasswordApi: (data) => {
        return apiClient.put("/users/me/password", data);
    },

    // Xóa tài khoản hiện tại
    deleteMeApi: () => {
        return apiClient.delete("/users/me");
    },

    // ADMIN: lấy thông tin user theo ID
    getByIdApi: (userId) => {
        return apiClient.get(`/users/${userId}`);
    },

    // ADMIN: khôi phục tài khoản
    restoreApi: (userId) => {
        return apiClient.patch(`/users/${userId}/restore`);
    },
};

export default userAPI;