
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
    <div className="relative min-h-screen overflow-hidden bg-[#F5F3FF] px-4 py-8">

      {/* ==================================================
    Background decorations
================================================== */}

      {/* Purple glow - top right of login card */}
      <div
        className="
        pointer-events-none
        absolute
        left-1/2
        top-[18%]
        h-[420px]
        w-[420px]
        -translate-x-1/2
        rounded-full
        bg-[#DDD7FF]
        opacity-50
        blur-3xl
    "
      />

      {/* Blue glow - bottom left */}
      <div
        className="
        pointer-events-none
        absolute
        bottom-[8%]
        left-[25%]
        h-[260px]
        w-[260px]
        rounded-full
        bg-[#DCEBFF]
        opacity-50
        blur-3xl
    "
      />

      {/* Pink glow - bottom right */}
      <div
        className="
        pointer-events-none
        absolute
        bottom-[15%]
        right-[25%]
        h-[220px]
        w-[220px]
        rounded-full
        bg-[#FFE1EF]
        opacity-50
        blur-3xl
    "
      />

      {/* Decorative dots */}
      <div
        className="
        pointer-events-none
        absolute
        left-[calc(50%-260px)]
        top-[28%]
        h-2
        w-2
        rounded-full
        bg-[#6C5CE7]
        opacity-60
    "
      />

      <div
        className="
        pointer-events-none
        absolute
        right-[calc(50%-260px)]
        top-[35%]
        h-3
        w-3
        rounded-full
        bg-[#F59E0B]
        opacity-60
    "
      />

      <div
        className="
        pointer-events-none
        absolute
        bottom-[28%]
        left-[calc(50%-230px)]
        h-2
        w-2
        rounded-full
        bg-[#3B82F6]
        opacity-60
    "
      />

      {/* ==================================================
    Floating education objects
================================================== */}

      {/* Book - left upper */}
      <div
        className="
        group
        pointer-events-auto
        absolute
        left-[calc(50%-365px)]
        top-[30%]
        hidden
        cursor-default
        sm:flex
    "
      >
        <div
          className="
            flex
            h-14
            w-14
            rotate-[-10deg]
            items-center
            justify-center
            rounded-[18px]
            border
            border-white/80
            bg-white/80
            text-[#6C5CE7]
            shadow-[0_10px_30px_rgba(108,92,231,0.12)]
            backdrop-blur-md
            transition-all
            duration-300
            ease-out
            group-hover:-translate-y-2
            group-hover:rotate-0
            group-hover:scale-110
            group-hover:shadow-[0_16px_35px_rgba(108,92,231,0.22)]
        "
        >
          <BookOpen
            size={24}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Graduation cap - right upper */}
      <div
        className="
        group
        pointer-events-auto
        absolute
        right-[calc(50%-365px)]
        top-[27%]
        hidden
        cursor-default
        sm:flex
    "
      >
        <div
          className="
            flex
            h-14
            w-14
            rotate-[10deg]
            items-center
            justify-center
            rounded-[18px]
            border
            border-white/80
            bg-white/80
            text-[#3B82F6]
            shadow-[0_10px_30px_rgba(59,130,246,0.12)]
            backdrop-blur-md
            transition-all
            duration-300
            ease-out
            group-hover:-translate-y-2
            group-hover:rotate-0
            group-hover:scale-110
            group-hover:shadow-[0_16px_35px_rgba(59,130,246,0.22)]
        "
        >
          <GraduationCap
            size={25}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Pencil - left bottom */}
      <div
        className="
        group
        pointer-events-auto
        absolute
        bottom-[25%]
        left-[calc(50%-345px)]
        hidden
        cursor-default
        sm:flex
    "
      >
        <div
          className="
            flex
            h-12
            w-12
            rotate-[-14deg]
            items-center
            justify-center
            rounded-[16px]
            border
            border-white/80
            bg-white/80
            text-[#EC4899]
            shadow-[0_10px_30px_rgba(236,72,153,0.12)]
            backdrop-blur-md
            transition-all
            duration-300
            ease-out
            group-hover:-translate-y-2
            group-hover:rotate-[-5deg]
            group-hover:scale-110
            group-hover:shadow-[0_16px_35px_rgba(236,72,153,0.22)]
        "
        >
          <Pencil
            size={21}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Lightbulb - right bottom */}
      <div
        className="
        group
        pointer-events-auto
        absolute
        bottom-[22%]
        right-[calc(50%-345px)]
        hidden
        cursor-default
        sm:flex
    "
      >
        <div
          className="
            flex
            h-12
            w-12
            rotate-[8deg]
            items-center
            justify-center
            rounded-[16px]
            border
            border-white/80
            bg-white/80
            text-[#F59E0B]
            shadow-[0_10px_30px_rgba(245,158,11,0.12)]
            backdrop-blur-md
            transition-all
            duration-300
            ease-out
            group-hover:-translate-y-2
            group-hover:rotate-0
            group-hover:scale-110
            group-hover:shadow-[0_16px_35px_rgba(245,158,11,0.22)]
        "
        >
          <Lightbulb
            size={22}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Small sparkle - near top left */}
      <div
        className="
        group
        pointer-events-auto
        absolute
        left-[calc(50%-220px)]
        top-[22%]
        hidden
        sm:block
    "
      >
        <Sparkles
          size={18}
          className="
            rotate-[-15deg]
            text-[#8B7CF6]
            opacity-70
            transition-all
            duration-300
            group-hover:rotate-12
            group-hover:scale-125
            group-hover:text-[#6C5CE7]
        "
        />
      </div>

      {/* Small sparkle - near bottom right */}
      <div
        className="
        group
        pointer-events-auto
        absolute
        bottom-[20%]
        right-[calc(50%-220px)]
        hidden
        sm:block
    "
      >
        <Sparkles
          size={16}
          className="
            rotate-[15deg]
            text-[#F59E0B]
            opacity-70
            transition-all
            duration-300
            group-hover:-rotate-12
            group-hover:scale-125
            group-hover:text-[#F97316]
        "
        />
      </div>

      {/* ==================================================
                Main
            ================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="w-full">



          {/* ==================================================
                        Login card
                    ================================================== */}

          <div
            className="
                            rounded-[28px]
                            border
                            border-white
                            bg-white/95
                            p-6
                            shadow-[0_20px_60px_rgba(67,52,140,0.12)]
                            backdrop-blur-xl
                            sm:p-8
                        "
          >
            {/* Heading */}
            <div className="text-center">
              {/* Branding */}
              <div className="mb-5 flex flex-col items-center">

                <div
                  className="
                                mb-3
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-[20px]
                                bg-white
                                shadow-[0_10px_30px_rgba(108,92,231,0.15)]
                                ring-1
                                ring-white
                            "
                >
                  <Logo
                    showText={false}
                    size="lg"
                    border={false}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Sparkles
                    size={14}
                    className="text-[#8B7CF6]"
                  />

                  <span className="text-[13px] font-medium text-[#77738F]">
                    Học tập dễ dàng hơn cùng Stady
                  </span>

                  <Sparkles
                    size={14}
                    className="text-[#8B7CF6]"
                  />
                </div>
              </div>
              <h1 className="text-[25px] font-bold tracking-tight text-[#211C4A]">
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
                  className="mb-2 block text-[13px] font-semibold text-[#45405F]"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    strokeWidth={1.8}
                    className="
                                            absolute
                                            left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-[#AAA6BB]
                                        "
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="Nhập email của bạn"
                    autoComplete="email"
                    disabled={loading}
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-[#E8E6F0]
                                            bg-[#FAFAFD]
                                            py-3
                                            pl-11
                                            pr-4
                                            text-[13px]
                                            text-[#211C4A]
                                            outline-none
                                            transition
                                            placeholder:text-[#B3B0BD]
                                            focus:border-[#6C5CE7]
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-[#6C5CE7]/10
                                            disabled:cursor-not-allowed
                                            disabled:bg-gray-100
                                        "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 flex items-center justify-between text-[13px] font-semibold text-[#45405F]"
                >
                  <span>Mật khẩu</span>

                  <Link
                    to="/forgot-password"
                    className="
                                            text-[12px]
                                            font-semibold
                                            text-[#6C5CE7]
                                            transition
                                            hover:text-[#5849D4]
                                            hover:underline
                                        "
                  >
                    Quên mật khẩu?
                  </Link>
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    strokeWidth={1.8}
                    className="
                                            absolute
                                            left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-[#AAA6BB]
                                        "
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
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    disabled={loading}
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-[#E8E6F0]
                                            bg-[#FAFAFD]
                                            py-3
                                            pl-11
                                            pr-12
                                            text-[13px]
                                            text-[#211C4A]
                                            outline-none
                                            transition
                                            placeholder:text-[#B3B0BD]
                                            focus:border-[#6C5CE7]
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-[#6C5CE7]/10
                                            disabled:cursor-not-allowed
                                            disabled:bg-gray-100
                                        "
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
                    className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-[#AAA6BB]
                                            transition
                                            hover:text-[#6C5CE7]
                                            disabled:cursor-not-allowed
                                        "
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                                    group
                                    relative
                                    w-full
                                    overflow-hidden
                                    rounded-lg
                                    bg-gradient-to-r
                                    from-[#6C5CE7]
                                    to-[#806FF0]
                                    px-4
                                    py-3
                                    text-[13px]
                                    font-semibold
                                    text-white
                                    shadow-[0_8px_20px_rgba(108,92,231,0.25)]
                                    transition-all
                                    hover:-translate-y-0.5
                                    hover:shadow-[0_10px_25px_rgba(108,92,231,0.3)]
                                    active:translate-y-0
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    disabled:hover:translate-y-0
                                    cursor-pointer
                                "
              >
                {/* Shine */}
                <span
                  className="
                                        pointer-events-none
                                        absolute
                                        inset-y-0
                                        -left-10
                                        w-8
                                        rotate-[20deg]
                                        bg-white/20
                                        transition-all
                                        duration-700
                                        group-hover:left-[110%]
                                        pointer
                                    "
                />

                <span className="relative">
                  {loading
                    ? "Đang đăng nhập..."
                    : "Đăng nhập"}
                </span>
              </button>
            </form>

            {/* Register */}
            <div className="mt-6 text-center text-[13px] text-[#88849C]">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="
                                    font-semibold
                                    text-[#6C5CE7]
                                    transition
                                    hover:text-[#5849D4]
                                    hover:underline
                                "
              >
                Đăng ký
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-[#AAA6BB]">
            <BookOpen size={12} />

            <span>
              Học tập · Khám phá · Phát triển
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;