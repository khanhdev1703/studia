import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import Logo from "../../components/common/Logo";
import authService from "../../services/authService";
import appToast from "../../utils/toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!name.trim()) {
      appToast.error("Vui lòng nhập họ và tên.");
      return;
    }

    if (!email.trim()) {
      appToast.error("Vui lòng nhập email.");
      return;
    }

    if (!password) {
      appToast.error("Vui lòng nhập mật khẩu.");
      return;
    }

    if (password !== confirmPassword) {
      appToast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    try {
      const result = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      appToast.success(result.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      appToast.error(
        error?.response?.data?.message ||
        error.message ||
        "Đăng ký không thành công."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FF] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <Logo
              showText={false}
              size="lg"
              border={false}
            />
          </div>

          {/* Heading */}
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Tạo tài khoản
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Họ và tên
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Nhập họ và tên"
                  autoComplete="name"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Nhập email của bạn"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>

              <div className="relative">
                <LockKeyhole
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Nhập mật khẩu"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-12 text-sm outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Ẩn mật khẩu"
                      : "Hiển thị mật khẩu"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu
              </label>

              <div className="relative">
                <LockKeyhole
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-12 text-sm outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  aria-label={
                    showConfirmPassword
                      ? "Ẩn mật khẩu"
                      : "Hiển thị mật khẩu"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#6C5CE7] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5b4bd6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Đang đăng ký..."
                : "Đăng ký"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#6C5CE7] hover:underline"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;