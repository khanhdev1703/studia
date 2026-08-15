import {
  loginApi,
  registerApi,
  getMeApi,
} from "../api/authApi";

import useAuthStore from "../stores/authStore";

const login = async ({ email, password }) => {
  const response = await loginApi({
    email,
    password,
  });

  const { success, message, data } = response.data;

  if (!success || !data?.accessToken) {
    throw new Error(
      message || "Đăng nhập không thành công."
    );
  }

  useAuthStore
    .getState()
    .setAccessToken(data.accessToken);

  return {
    message,
    data,
  };
};

const register = async ({
  name,
  email,
  password,
}) => {
  const response = await registerApi({
    name,
    email,
    password,
  });

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(
      message || "Đăng ký không thành công."
    );
  }

  return {
    message,
    data,
  };
};

const getMe = async () => {
  const response = await getMeApi();

  const { success, message, data } = response.data;

  if (!success || !data?.user) {
    throw new Error(
      message ||
      "Không thể lấy thông tin người dùng."
    );
  }

  useAuthStore
    .getState()
    .setUser(data.user);

  return {
    message,
    data,
  };
};

const logout = async () => {
  useAuthStore
    .getState()
    .logout();
};

export default {
  login,
  register,
  getMe,
  logout,
};