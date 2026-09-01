import { Link } from "react-router-dom";

import {
    ArrowRight,
    Languages,
} from "lucide-react";

import FavoriteIcon from '@mui/icons-material/Favorite';

import Brand from "../components/common/Brand";

const LandingPage = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-[#F0F5FC] text-[#0F172A]">
            {/* Header */}
            <header className="relative z-10 px-5 py-5 sm:px-8">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    {/* Brand */}
                    <div className="flex flex-col leading-none">
                        <Brand width={150} />
                    </div>

                    {/* Login */}
                    <Link
                        to="/login"
                        className="rounded-full border border-[#0a479d]/25 bg-white px-5 py-2.5 text-sm font-bold text-[#0a479d] shadow-sm transition hover:border-[#0a479d] hover:bg-[#0a479d] hover:text-white"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="relative overflow-hidden px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
                    {/* Background Decorations */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        {/* Primary Blue blob */}
                        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0a479d]/12 blur-3xl" />

                        {/* Soft Gold/Yellow blob */}
                        <div className="absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-[#F59E0B]/12 blur-3xl" />

                        {/* Small primary blue circle */}
                        <div className="absolute right-[12%] top-[18%] h-5 w-5 rounded-full bg-[#0a479d]/30 animate-pulse" />

                        {/* Small gold circle */}
                        <div className="absolute left-[8%] top-[35%] h-3 w-3 rounded-full bg-[#F59E0B]/70" />

                        {/* Dotted pattern */}
                        <div className="absolute right-[5%] top-[42%] grid grid-cols-4 gap-2 opacity-25">
                            {Array.from({ length: 16 }).map((_, index) => (
                                <span
                                    key={index}
                                    className="h-1.5 w-1.5 rounded-full bg-[#0a479d]"
                                />
                            ))}
                        </div>

                        {/* Decorative plus */}
                        <div className="absolute left-[18%] top-[16%] text-3xl font-light text-[#0a479d]/25">
                            +
                        </div>

                        <div className="absolute bottom-[18%] right-[20%] text-4xl font-light text-[#F59E0B]/40">
                            +
                        </div>
                    </div>

                    <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                        {/* Hero Logo */}
                        <div className="relative flex justify-center lg:justify-end">

                            {/* Blue ring */}
                            <div className="absolute h-[250px] w-[250px] rounded-full border-2 border-[#0a479d]/15 sm:h-[320px] sm:w-[320px]" />

                            {/* Floating gold dot */}
                            <div className="absolute -right-3 top-10 h-5 w-5 rounded-full bg-[#F59E0B] shadow-md shadow-[#F59E0B]/30 sm:right-0" />

                            {/* Floating blue dot */}
                            <div className="absolute -left-2 top-20 h-3.5 w-3.5 rounded-full bg-[#0a479d]/80 sm:left-2" />

                            {/* Floating gold dot */}
                            <div className="absolute bottom-16 right-5 h-3 w-3 rounded-full bg-[#F59E0B]/80" />

                            {/* Plus */}
                            <div className="absolute -bottom-2 left-8 text-3xl font-light text-[#0a479d]/30">
                                +
                            </div>

                            {/* Logo */}
                            <div className="relative w-[280px] sm:w-[380px]">
                                <img
                                    src="/logo.png"
                                    alt="Achan - Học tiếng Lào"
                                    className="relative z-10 h-auto w-full drop-shadow-xl"
                                />
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="text-center lg:text-left">
                            {/* Small badge */}
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0a479d]/20 bg-white px-4 py-2 text-xs font-bold text-[#0a479d] shadow-sm">
                                <Languages size={16} className="text-[#0a479d]" />

                                <span>Học tiếng Lào cùng Achan</span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-[#0F172A] sm:text-5xl md:text-6xl">
                                Tiếng Lào
                                <span className="block text-[#0a479d]">
                                    không khó
                                </span>
                            </h1>

                            {/* Slogan */}
                            <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
                                <div className="h-0.5 w-8 bg-[#F59E0B]" />

                                <p className="text-lg font-bold italic text-[#D97706] sm:text-xl flex">
                                    vì có Achan
                                    <span className="ml-1">
                                        <FavoriteIcon />
                                    </span>
                                </p>

                                <div className="h-0.5 w-8 bg-[#F59E0B]" />
                            </div>

                            {/* Description */}
                            <p className="mx-auto mt-7 max-w-xl text-justify text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0">
                                Học tiếng Lào theo cách đơn giản, dễ hiểu và
                                gần gũi. Từng bài học nhỏ giúp bạn tự tin hơn
                                trong việc nghe, nói, đọc và sử dụng tiếng Lào
                                mỗi ngày.
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                                <Link
                                    to="/login"
                                    className="group flex w-full items-center justify-center gap-2 rounded-md bg-[#0a479d] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0a479d]/25 transition hover:bg-[#08387d] hover:shadow-xl sm:w-auto"
                                >
                                    Bắt đầu học tiếng Lào

                                    <ArrowRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/register"
                                    className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#0a479d] hover:text-[#0a479d] sm:w-auto"
                                >
                                    Tạo tài khoản
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white px-5 py-7 sm:px-8">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} Achan
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;