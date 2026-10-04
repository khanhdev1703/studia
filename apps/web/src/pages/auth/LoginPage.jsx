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
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAF7] px-4 py-6 sm:px-6 sm:py-8">
      {/* ==================================================
          Soft EdTech Background
      ================================================== */}

      {/* Large soft blue glow */}
      <div className="pointer-events-none absolute left-1/2 top-[5%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#DCEEFF]/70 blur-[90px] sm:h-[560px] sm:w-[560px]" />

      {/* Soft mint glow */}
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-[#DDF5ED]/80 blur-[100px]" />

      {/* Warm learning accent */}
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-[300px] w-[300px] rounded-full bg-[#FFF0C9]/60 blur-[100px]" />

      {/* Very subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(#DDE8E3 1px, transparent 1px), linear-gradient(90deg, #DDE8E3 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />

      {/* Decorative dots */}
      <div className="pointer-events-none absolute left-[10%] top-[23%] h-2 w-2 rounded-full bg-[#78B7E8]/60" />
      <div className="pointer-events-none absolute right-[12%] top-[27%] h-2.5 w-2.5 rounded-full bg-[#F0C75E]/70" />
      <div className="pointer-events-none absolute bottom-[23%] left-[14%] h-1.5 w-1.5 rounded-full bg-[#69BFA5]/60" />
      <div className="pointer-events-none absolute bottom-[18%] right-[14%] h-2 w-2 rounded-full bg-[#78B7E8]/50" />

      {/* ==================================================
          Floating Education Objects
      ================================================== */}

      {/* Book */}
      <div className="group pointer-events-none absolute left-[calc(50%-390px)] top-[29%] hidden sm:block lg:pointer-events-auto">
        <div className="flex h-14 w-14 rotate-[-8deg] items-center justify-center rounded-[18px] border border-white/90 bg-white/75 text-[#3C82B8] shadow-[0_12px_35px_rgba(60,130,184,0.10)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-105">
          <BookOpen size={23} strokeWidth={1.7} />
        </div>
      </div>

      {/* Graduation Cap */}
      <div className="group pointer-events-none absolute right-[calc(50%-390px)] top-[26%] hidden sm:block lg:pointer-events-auto">
        <div className="flex h-14 w-14 rotate-[8deg] items-center justify-center rounded-[18px] border border-white/90 bg-white/75 text-[#4E9BCB] shadow-[0_12px_35px_rgba(78,155,203,0.10)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-105">
          <GraduationCap size={24} strokeWidth={1.7} />
        </div>
      </div>

      {/* Pencil */}
      <div className="group pointer-events-none absolute bottom-[24%] left-[calc(50%-365px)] hidden sm:block lg:pointer-events-auto">
        <div className="flex h-12 w-12 rotate-[-12deg] items-center justify-center rounded-[17px] border border-white/90 bg-white/75 text-[#5BAF9A] shadow-[0_12px_35px_rgba(91,175,154,0.10)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-[-4deg] group-hover:scale-105">
          <Pencil size={20} strokeWidth={1.7} />
        </div>
      </div>

      {/* Lightbulb */}
      <div className="group pointer-events-none absolute bottom-[21%] right-[calc(50%-365px)] hidden sm:block lg:pointer-events-auto">
        <div className="flex h-12 w-12 rotate-[7deg] items-center justify-center rounded-[17px] border border-white/90 bg-white/75 text-[#D5A83C] shadow-[0_12px_35px_rgba(213,168,60,0.10)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-105">
          <Lightbulb size={21} strokeWidth={1.7} />
        </div>
      </div>

      {/* Sparkles */}
      <div className="group pointer-events-none absolute left-[calc(50%-245px)] top-[20%] hidden sm:block">
        <Sparkles
          size={17}
          className="rotate-[-12deg] text-[#6BA9D5]/70 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125"
        />
      </div>

      <div className="group pointer-events-none absolute bottom-[18%] right-[calc(50%-245px)] hidden sm:block">
        <Sparkles
          size={16}
          className="rotate-[12deg] text-[#D5A83C]/70 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-125"
        />
      </div>

      {/* ==================================================
          Main
      ================================================== */}

      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] w-full items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-[430px]">
          {/* Login Card */}
          <div className="relative overflow-hidden rounded-[26px] border border-[#E4EAE7] bg-white/95 p-5 shadow-[0_20px_60px_rgba(45,75,65,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:p-8">
            {/* Soft top accent */}
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#4E9BCB] via-[#69BFA5] to-[#E7C45D]" />

            {/* Decorative inner glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#DCEEFF]/60 blur-3xl" />

            {/* Heading */}
            <div className="relative text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-[70px] w-[70px] items-center justify-center rounded-[21px] border border-[#E6ECEA] bg-[#FAFCFB] shadow-[0_8px_25px_rgba(60,100,90,0.06)]">
                  <Logo link={"/"} />
                </div>
              </div>

              <h1 className="text-[24px] font-bold tracking-[-0.025em] text-[#193B4A] sm:text-[26px]">
                Đăng nhập
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative mt-7 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-semibold text-[#405563]"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9BAEB7]"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    autoComplete="email"
                    disabled={loading}
                    className="h-12 w-full rounded-[13px] border border-[#DCE5E2] bg-[#F9FBFA] py-3 pl-11 pr-4 text-[13px] text-[#193B4A] outline-none transition-all placeholder:text-[#9BAEB7] hover:border-[#C9D8D3] focus:border-[#5A9FC5] focus:bg-white focus:ring-4 focus:ring-[#5A9FC5]/10 disabled:cursor-not-allowed disabled:bg-[#F1F4F3]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 flex items-center justify-between text-[13px] font-semibold text-[#405563]"
                >
                  <span>Mật khẩu</span>

                  <Link
                    to="/forgot-password"
                    className="text-[12px] font-semibold text-[#3D82AC] transition-colors hover:text-[#286585] hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9BAEB7]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    disabled={loading}
                    className="h-12 w-full rounded-[13px] border border-[#DCE5E2] bg-[#F9FBFA] py-3 pl-11 pr-12 text-[13px] text-[#193B4A] outline-none transition-all placeholder:text-[#9BAEB7] hover:border-[#C9D8D3] focus:border-[#5A9FC5] focus:bg-white focus:ring-4 focus:ring-[#5A9FC5]/10 disabled:cursor-not-allowed disabled:bg-[#F1F4F3]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Ẩn mật khẩu"
                        : "Hiển thị mật khẩu"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#9BAEB7] transition-colors hover:text-[#3D82AC] disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-1 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-[13px] bg-[#4E9BCB] px-4 text-[13px] font-semibold text-white shadow-[0_9px_22px_rgba(78,155,203,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#438DBB] hover:shadow-[0_13px_28px_rgba(78,155,203,0.28)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {/* Shine */}
                <span className="pointer-events-none absolute inset-y-0 -left-10 w-8 rotate-[20deg] bg-white/20 transition-all duration-700 group-hover:left-[110%]" />

                <span className="relative">
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </span>
              </button>
            </form>

            {/* Register */}
            <div className="relative mt-6 text-center text-[13px] text-[#71818A]">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#3D82AC] transition-colors hover:text-[#286585] hover:underline"
              >
                Đăng ký
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-[#9BAEB7]">
            <span className="h-px w-8 bg-[#DCE5E2]" />
            <BookOpen size={12} />
            <span>Achan</span>
            <span className="h-px w-8 bg-[#DCE5E2]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
