import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const ACCESS_TOKEN_KEY = 'access-token';

const getStoredAccessToken = () => {
    try {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
        console.error(
            'Không thể lấy token đăng nhập.',
            error
        );

        return null;
    }
};

const useAuthStore = create(
    devtools(
        (set) => ({
            accessToken: getStoredAccessToken(),
            user: null,

            setAccessToken: (accessToken) => {
                localStorage.setItem(
                    ACCESS_TOKEN_KEY,
                    accessToken
                );

                set(
                    { accessToken },
                    false,
                    'auth/setAccessToken'
                );
            },

            setUser: (user) => {
                set(
                    { user },
                    false,
                    'auth/setUser'
                );
            },

            logout: () => {
                localStorage.removeItem(
                    ACCESS_TOKEN_KEY
                );

                set(
                    {
                        accessToken: null,
                        user: null,
                    },
                    false,
                    'auth/logout'
                );
            },
        }),
        {
            name: 'AuthStore',
        }
    )
);

export default useAuthStore;