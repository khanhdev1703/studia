// src/api/authApi.js

import apiClient from "./apiClient";

export const loginApi = (data) => {
    return apiClient.post("/auth/login", data);
};

export const registerApi = (data) => {
    return apiClient.post("/auth/register", data);
};

export const getMeApi = () => {
    return apiClient.get("/user/me");
};