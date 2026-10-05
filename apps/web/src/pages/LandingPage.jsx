import { Link } from "react-router-dom";

import {
    ArrowRight,
    Languages,
} from "lucide-react";

import FavoriteIcon from "@mui/icons-material/Favorite";

import Brand from "../components/common/Brand";

const LandingPage = () => {
    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#193B4A]">
            {/* Header */}
            <header className="relative z-30 border-b border-[#E4EAE7] bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
                <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between sm:h-[76px]">
                    {/* Brand */}
                    <div className="flex items-center">
                        <Brand width={140} />
                    </div>

                    {/* Login */}
                    <Link
                        to="/login"
                        className="
                            shrink-0
                            rounded-xl
                            border border-[#DCE5E2]
                            bg-white
                            px-4 py-2.5
                            text-xs font-bold
                            text-[#3D82AC]
                            shadow-[0_2px_8px_rgba(45,75,65,0.04)]
                            transition-all duration-200
                            hover:border-[#4E9BCB]
                            hover:bg-[#4E9BCB]
                            hover:text-white
                            hover:shadow-[0_8px_20px_rgba(78,155,203,0.18)]
                            sm:px-5 sm:text-sm
                        "
                    >
                        Đăng nhập
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero */}
                <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 md:px-8 md:pb-24 md:pt-16 lg:px-10 lg:pb-28 lg:pt-20">
                    {/* Background */}
                    <div className="pointer-events-none absolute inset-0">
                        {/* Blue glow */}
                        <div className="absolute -right-[180px] -top-[180px] h-[420px] w-[420px] rounded-full bg-[#DCEEFF]/70 blur-[90px] sm:h-[520px] sm:w-[520px]" />

                        {/* Mint glow */}
                        <div className="absolute -bottom-[180px] -left-[180px] h-[400px] w-[400px] rounded-full bg-[#DDF5ED]/70 blur-[90px] sm:h-[500px] sm:w-[500px]" />

                        {/* Warm learning glow */}
                        <div className="absolute -bottom-[150px] right-[8%] h-[330px] w-[330px] rounded-full bg-[#FFF0C9]/50 blur-[100px]" />

                        {/* Subtle grid */}
                        <div
                            className="absolute inset-0 opacity-[0.22]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(#DDE8E3 1px, transparent 1px), linear-gradient(90deg, #DDE8E3 1px, transparent 1px)",
                                backgroundSize: "48px 48px",
                                maskImage:
                                    "radial-gradient(circle at center, black 0%, transparent 72%)",
                                WebkitMaskImage:
                                    "radial-gradient(circle at center, black 0%, transparent 72%)",
                            }}
                        />

                        {/* Accent dots */}
                        <div className="absolute right-[9%] top-[18%] h-2 w-2 rounded-full bg-[#78B7E8]/50" />
                        <div className="absolute left-[6%] top-[40%] h-2 w-2 rounded-full bg-[#F0C75E]/60" />
                    </div>

                    <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">
                        {/* Hero Visual */}
                        <div className="relative flex w-full justify-center lg:justify-start">
                            {/* Glow behind card */}
                            <div className="absolute h-[280px] w-[280px] rounded-full bg-[#DCEEFF]/80 blur-[60px] sm:h-[380px] sm:w-[380px]" />

                            {/* Main SaaS card */}
                            <div
                                className="
                                    relative
                                    flex aspect-square
                                    w-[min(84vw,330px)]
                                    items-center justify-center
                                    overflow-visible
                                    rounded-[28px]
                                    border border-white
                                    bg-white/95
                                    shadow-[0_25px_80px_-30px_rgba(45,75,65,0.20)]
                                    backdrop-blur-xl
                                    sm:w-[370px]
                                    sm:rounded-[32px]
                                    md:w-[410px]
                                    lg:w-[420px]
                                    xl:w-[440px]
                                "
                            >
                                {/* Soft top gradient */}
                                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                                    <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#DCEEFF]/70 blur-3xl" />

                                    <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#FFF0C9]/60 blur-3xl" />
                                </div>

                                {/* Inner frame */}
                                <div className="absolute inset-3.5 rounded-[22px] border border-[#E4EAE7] sm:inset-5 sm:rounded-[26px]" />

                                {/* Browser-like dots */}
                                <div className="absolute left-6 top-6 z-10 flex items-center gap-1.5 sm:left-8 sm:top-8">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#4E9BCB] sm:h-2 sm:w-2" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#D5A83C] sm:h-2 sm:w-2" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#DCE5E2] sm:h-2 sm:w-2" />
                                </div>

                                {/* Decorative ring */}
                                <div className="absolute h-[70%] w-[70%] rounded-full border border-[#4E9BCB]/[0.10]" />

                                {/* Gold dot */}
                                <div className="absolute -right-1 top-14 z-20 h-4 w-4 rounded-full bg-[#D5A83C] shadow-[0_6px_18px_rgba(213,168,60,0.20)] sm:right-1 sm:top-16 sm:h-5 sm:w-5" />

                                {/* Blue dot */}
                                <div className="absolute -left-1 top-24 z-20 h-3 w-3 rounded-full bg-[#4E9BCB]/70 sm:left-1 sm:top-28 sm:h-3.5 sm:w-3.5" />

                                {/* Bottom accent */}
                                <div className="absolute bottom-9 right-7 h-2.5 w-2.5 rounded-full bg-[#D5A83C]/65 sm:bottom-12 sm:right-9 sm:h-3 sm:w-3" />

                                {/* Plus */}
                                <div className="absolute bottom-7 left-7 text-xl font-light text-[#4E9BCB]/30 sm:bottom-9 sm:left-9 sm:text-2xl">
                                    +
                                </div>

                                {/* Logo */}
                                <div className="relative z-10 w-[67%] sm:w-[72%]">
                                    <img
                                        src="/logo.png"
                                        alt="Achan - Học tiếng Lào"
                                        className="
                                            h-auto
                                            w-full
                                            drop-shadow-[0_18px_25px_rgba(45,75,65,0.14)]
                                        "
                                    />
                                </div>

                                {/* Floating information card */}
                                <div className="absolute -bottom-4 -right-2 z-20 hidden rounded-2xl border border-[#E4EAE7] bg-white px-4 py-3 shadow-[0_14px_35px_-15px_rgba(45,75,65,0.20)] sm:block sm:-right-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF6FC]">
                                            <Languages
                                                size={16}
                                                className="text-[#4E9BCB]"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-medium text-[#9BAEB7]">
                                                Learning
                                            </p>

                                            <p className="text-xs font-bold text-[#193B4A]">
                                                Tiếng Lào
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="w-full text-center lg:text-left">
                            {/* Badge */}
                            <div
                                className="
                                    mb-5
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border border-[#DCE5E2]
                                    bg-white/90
                                    px-3.5 py-2
                                    text-[11px] font-bold
                                    text-[#3D82AC]
                                    shadow-[0_4px_14px_rgba(45,75,65,0.05)]
                                    backdrop-blur-sm
                                    sm:mb-6 sm:px-4 sm:text-xs
                                "
                            >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF6FC]">
                                    <Languages
                                        size={13}
                                        className="text-[#4E9BCB]"
                                    />
                                </span>

                                <span>Học tiếng Lào cùng Achan</span>
                            </div>

                            {/* Heading */}
                            <h1
                                className="
                                    text-[2.75rem]
                                    font-black
                                    leading-[1.02]
                                    tracking-[-0.05em]
                                    text-[#193B4A]
                                    sm:text-5xl
                                    md:text-6xl
                                    lg:text-[4rem]
                                    xl:text-[4.5rem]
                                "
                            >
                                Tiếng Lào

                                <span className="mt-1 block bg-gradient-to-r from-[#4E9BCB] via-[#5FA9CF] to-[#78B7E8] bg-clip-text pb-2 text-transparent">
                                    không khó
                                </span>
                            </h1>

                            {/* Slogan */}
                            <div className="mt-5 flex items-center justify-center gap-2 sm:gap-3 lg:justify-start">
                                <div className="h-px w-7 bg-[#D5A83C] sm:w-9" />

                                <p className="flex items-center text-base font-bold italic text-[#B48628] sm:text-lg md:text-xl">
                                    vì có Achan

                                    <span className="ml-1 flex">
                                        <FavoriteIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 17,
                                                    sm: 19,
                                                },
                                                color: "#D5A83C",
                                            }}
                                        />
                                    </span>
                                </p>

                                <div className="h-px w-7 bg-[#D5A83C] sm:w-9" />
                            </div>

                            {/* Description */}
                            <p className="mx-auto mt-6 max-w-xl text-left text-sm leading-6 text-[#71818A] sm:mt-7 sm:text-base sm:leading-7 md:text-lg md:leading-8 lg:mx-0">
                                Học tiếng Lào theo cách đơn giản, dễ hiểu và
                                gần gũi. Từng bài học nhỏ giúp bạn tự tin hơn
                                trong việc nghe, nói, đọc và sử dụng tiếng Lào
                                mỗi ngày.
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row lg:justify-start">
                                <Link
                                    to="/login"
                                    className="
                                        group
                                        flex min-h-[50px]
                                        w-full items-center justify-center gap-2
                                        rounded-xl
                                        bg-[#4E9BCB]
                                        px-6 py-3.5
                                        text-sm font-bold text-white
                                        shadow-[0_12px_28px_-10px_rgba(78,155,203,0.40)]
                                        transition-all duration-200
                                        hover:-translate-y-0.5
                                        hover:bg-[#438DBB]
                                        hover:shadow-[0_18px_34px_-10px_rgba(78,155,203,0.45)]
                                        sm:w-auto sm:px-7
                                    "
                                >
                                    Bắt đầu học tiếng Lào

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/register"
                                    className="
                                        flex min-h-[50px]
                                        w-full items-center justify-center
                                        rounded-xl
                                        border border-[#DCE5E2]
                                        bg-white
                                        px-6 py-3.5
                                        text-sm font-bold
                                        text-[#405563]
                                        shadow-[0_3px_10px_rgba(45,75,65,0.04)]
                                        transition-all duration-200
                                        hover:-translate-y-0.5
                                        hover:border-[#4E9BCB]/40
                                        hover:text-[#3D82AC]
                                        hover:shadow-[0_10px_22px_rgba(45,75,65,0.08)]
                                        sm:w-auto sm:px-7
                                    "
                                >
                                    Tạo tài khoản
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            {/* <footer className="border-t border-[#E4EAE7] bg-white px-4 py-6 sm:px-6 sm:py-7 md:px-8">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
                    <p className="text-[11px] font-medium text-[#9BAEB7] sm:text-xs">
                        © {new Date().getFullYear()} Achan
                    </p>
                </div>
            </footer> */}
        </div>
    );
};

export default LandingPage;