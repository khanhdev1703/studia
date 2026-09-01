import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Lightbulb,
  LockKeyhole,
  Mail,
  Pencil,
  Sparkles,
} from "lucide-react";

import Logo from "../../components/common/Logo";
import authService from "../../services/authService";
import toast from "../../utils/toast";

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
      await authService.login({
        email: email.trim(),
        password,
      });

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
    <div className="relative min-h-screen overflow-hidden bg-[#f0f5ff] px-4 py-8">
      {/* ==================================================
          Background decorations (#0a479d Palette)
      ================================================== */}

      {/* Main glow - top right of login card */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#0a479d]/20 blur-3xl" />

      {/* Secondary glow - bottom left */}
      <div className="pointer-events-none absolute bottom-[8%] left-[25%] h-[260px] w-[260px] rounded-full bg-[#3b82f6]/20 blur-3xl" />

      {/* Cyan glow - bottom right */}
      <div className="pointer-events-none absolute bottom-[15%] right-[25%] h-[220px] w-[220px] rounded-full bg-[#06b6d4]/15 blur-3xl" />

      {/* Decorative dots */}
      <div className="pointer-events-none absolute left-[calc(50%-260px)] top-[28%] h-2 w-2 rounded-full bg-[#0a479d] opacity-60" />
      <div className="pointer-events-none absolute right-[calc(50%-260px)] top-[35%] h-3 w-3 rounded-full bg-[#f59e0b] opacity-60" />
      <div className="pointer-events-none absolute bottom-[28%] left-[calc(50%-230px)] h-2 w-2 rounded-full bg-[#0284c7] opacity-60" />

      {/* ==================================================
          Floating education objects
      ================================================== */}

      {/* Book - left upper */}
      <div className="group pointer-events-auto absolute left-[calc(50%-365px)] top-[30%] hidden cursor-default sm:flex">
        <div className="flex h-14 w-14 rotate-[-10deg] items-center justify-center rounded-[18px] border border-white/80 bg-white/80 text-[#0a479d] shadow-[0_10px_30px_rgba(10,71,157,0.12)] backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-110 group-hover:shadow-[0_16px_35px_rgba(10,71,157,0.22)]">
          <BookOpen size={24} strokeWidth={1.8} />
        </div>
      </div>

      {/* Graduation cap - right upper */}
      <div className="group pointer-events-auto absolute right-[calc(50%-365px)] top-[27%] hidden cursor-default sm:flex">
        <div className="flex h-14 w-14 rotate-[10deg] items-center justify-center rounded-[18px] border border-white/80 bg-white/80 text-[#0284c7] shadow-[0_10px_30px_rgba(2,132,199,0.12)] backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-110 group-hover:shadow-[0_16px_35px_rgba(2,132,199,0.22)]">
          <GraduationCap size={25} strokeWidth={1.8} />
        </div>
      </div>

      {/* Pencil - left bottom */}
      <div className="group pointer-events-auto absolute bottom-[25%] left-[calc(50%-345px)] hidden cursor-default sm:flex">
        <div className="flex h-12 w-12 rotate-[-14deg] items-center justify-center rounded-[16px] border border-white/80 bg-white/80 text-[#0284c7] shadow-[0_10px_30px_rgba(2,132,199,0.12)] backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-[-5deg] group-hover:scale-110 group-hover:shadow-[0_16px_35px_rgba(2,132,199,0.22)]">
          <Pencil size={21} strokeWidth={1.8} />
        </div>
      </div>

      {/* Lightbulb - right bottom */}
      <div className="group pointer-events-auto absolute bottom-[22%] right-[calc(50%-345px)] hidden cursor-default sm:flex">
        <div className="flex h-12 w-12 rotate-[8deg] items-center justify-center rounded-[16px] border border-white/80 bg-white/80 text-[#f59e0b] shadow-[0_10px_30px_rgba(245,158,11,0.12)] backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-110 group-hover:shadow-[0_16px_35px_rgba(245,158,11,0.22)]">
          <Lightbulb size={22} strokeWidth={1.8} />
        </div>
      </div>

      {/* Small sparkle - near top left */}
      <div className="group pointer-events-auto absolute left-[calc(50%-220px)] top-[22%] hidden sm:block">
        <Sparkles
          size={18}
          className="rotate-[-15deg] text-[#3b82f6] opacity-70 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125 group-hover:text-[#0a479d]"
        />
      </div>

      {/* Small sparkle - near bottom right */}
      <div className="group pointer-events-auto absolute bottom-[20%] right-[calc(50%-220px)] hidden sm:block">
        <Sparkles
          size={16}
          className="rotate-[15deg] text-[#f59e0b] opacity-70 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-125 group-hover:text-[#f97316]"
        />
      </div>

      {/* ==================================================
          Main Area
      ================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="w-full">
          {/* Login Card */}
          <div className="rounded-lg border border-white bg-white/95 p-6 shadow-[0_20px_60px_rgba(10,71,157,0.08)] backdrop-blur-xl sm:p-8">
            {/* Heading */}
            <div className="text-center">
              <div className="mb-2 flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center">
                  <Logo link={"/"} />
                </div>
              </div>
              <h1 className="text-[25px] font-bold tracking-tight text-[#082f63]">
                Đăng nhập
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-semibold text-[#334155]"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-sm border border-[#cbd5e1] bg-[#f8fafc] py-3 pl-11 pr-4 text-[13px] text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#0a479d] focus:bg-white focus:ring-4 focus:ring-[#0a479d]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 flex items-center justify-between text-[13px] font-semibold text-[#334155]"
                >
                  <span>Mật khẩu</span>

                  <Link
                    to="/forgot-password"
                    className="text-[12px] font-semibold text-[#0a479d] transition hover:text-[#063272] hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-sm border border-[#cbd5e1] bg-[#f8fafc] py-3 pl-11 pr-12 text-[13px] text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#0a479d] focus:bg-white focus:ring-4 focus:ring-[#0a479d]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    aria-label={
                      showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#0a479d] disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full cursor-pointer overflow-hidden rounded-sm bg-gradient-to-r from-[#0a479d] to-[#1258ba] px-4 py-3 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(10,71,157,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(10,71,157,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {/* Shine animation */}
                <span className="pointer-events-none absolute inset-y-0 -left-10 w-8 rotate-[20deg] bg-white/20 transition-all duration-700 group-hover:left-[110%]" />

                <span className="relative">
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </span>
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center text-[13px] text-[#64748b]">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#0a479d] transition hover:text-[#063272] hover:underline"
              >
                Đăng ký
              </Link>
            </div>
          </div>

          {/* Footer */}
          {/* <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-[#94a3b8]">
            <BookOpen size={12} />
            <span>Học tập · Khám phá · Phát triển</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;