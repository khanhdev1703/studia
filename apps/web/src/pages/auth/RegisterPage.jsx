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

  const inputClass = [
    "h-11 w-full",
    "rounded-xl",
    "border border-[#E4E4E7]",
    "bg-white",
    "py-2.5",
    "text-sm text-[#18181B]",
    "outline-none",
    "transition-colors",
    "placeholder:text-[#A1A1AA]",
    "hover:border-[#D4D4D8]",
    "focus:border-[#2563EB]",
    "focus:ring-2 focus:ring-[#DBEAFE]",
    "disabled:cursor-not-allowed",
    "disabled:bg-[#F8F8F7]",
    "disabled:text-[#A1A1AA]",
  ].join(" ");

  const labelClass =
    "mb-1.5 block text-xs font-medium text-[#3F3F46]";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F7F5] px-4 py-6 sm:px-6 sm:py-8">
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#EFF6FF] blur-[100px] sm:h-[520px] sm:w-[520px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[360px] w-[360px] rounded-full bg-[#F0FDF4] blur-[100px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(#E4E4E7 1px, transparent 1px), linear-gradient(90deg, #E4E4E7 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 70%)",
        }}
      />

      {/* Main */}
      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] w-full items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-[430px]">
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white p-5 shadow-[0_16px_45px_rgba(24,24,27,0.06)] sm:rounded-3xl sm:p-8">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-[#2563EB]" />

            {/* Header */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9]">
                  <Logo link="/" />
                </div>
              </div>

              <h1 className="text-xl font-semibold tracking-tight text-[#18181B] sm:text-2xl">
                Tạo tài khoản
              </h1>

              <p className="mt-1.5 text-xs text-[#71717A]">
                Tạo tài khoản để bắt đầu học tập.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className={labelClass}
                >
                  Họ và tên
                </label>

                <div className="relative">
                  <User
                    size={17}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
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
                    className={`${inputClass} pl-10 pr-4`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={labelClass}
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
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
                    className={`${inputClass} pl-10 pr-4`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className={labelClass}
                >
                  Mật khẩu
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
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
                    autoComplete="new-password"
                    disabled={loading}
                    className={`${inputClass} pl-10 pr-11`}
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#A1A1AA] transition-colors hover:text-[#3F3F46] disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={labelClass}
                >
                  Xác nhận mật khẩu
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
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
                    className={`${inputClass} pl-10 pr-11`}
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#A1A1AA] transition-colors hover:text-[#3F3F46] disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={[
                  "mt-1 flex h-11 w-full",
                  "items-center justify-center",
                  "rounded-xl",
                  "bg-[#18181B]",
                  "px-4",
                  "text-sm font-semibold text-white",
                  "transition-colors",
                  "hover:bg-[#27272A]",
                  "focus:outline-none",
                  "focus:ring-2 focus:ring-[#D4D4D8]",
                  "disabled:cursor-not-allowed",
                  "disabled:opacity-60",
                ].join(" ")}
              >
                {loading
                  ? "Đang đăng ký..."
                  : "Đăng ký"}
              </button>
            </form>

            {/* Login */}
            <div className="mt-5 text-center text-xs text-[#71717A]">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8] hover:underline"
              >
                Đăng nhập
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 text-center text-[10px] text-[#A1A1AA]">
            Achan
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;