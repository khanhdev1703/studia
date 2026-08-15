// src/api/apiClient.js

import axios from "axios";
import useAuthStore from "../stores/authStore";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
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

export default apiClient;