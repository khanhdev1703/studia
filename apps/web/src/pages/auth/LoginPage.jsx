import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import Logo from "../../components/common/Logo";
import authService from "../../services/authService";
import toast from "../../utils/toast"

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const result = await authService.login({
        email: email.trim(),
        password,
      });

      toast.success(result.message);

      navigate("/student");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Đăng nhập không thành công."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FF] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-4 flex justify-center">
            <Logo showText={false} size="lg" border={false} />
          </div>

          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Đăng nhập
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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
                className="mb-2 flex justify-between block text-sm font-medium text-gray-700"
              >
                <span>Mật khẩu</span>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#6C5CE7] hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </label>

              <div className="relative">
                <LockKeyhole
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#6C5CE7] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5b4bd6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Đang đăng nhập..."
                : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#6C5CE7] hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;