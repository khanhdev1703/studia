// src/api/authApi.js

import apiClient from "./apiClient";

const authApi = {
    login: (data) => {
        return apiClient.post("/auth/login", data);
    },
    register: (data) => {
        return apiClient.post("/auth/register", data);
    }
};

export default authApi;