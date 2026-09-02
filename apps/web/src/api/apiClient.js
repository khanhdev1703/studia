// src/api/apiClient.js

import axios from "axios";
import useAuthStore from "../stores/authStore";

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken =
            useAuthStore.getState().accessToken;

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ==========================================
// Response interceptor
// ==========================================

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status =
            error?.response?.status;

        if (status === 401) {
            const authStore =
                useAuthStore.getState();

            authStore.logout();

            // Chỉ redirect nếu hiện tại
            // chưa ở trang login
            if (
                window.location.pathname !==
                "/login"
            ) {
                window.location.replace(
                    "/login"
                );
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;