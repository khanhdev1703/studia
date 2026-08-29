import {
    ChevronRight,
    CircleHelp,
    GraduationCap,
    LogOut,
    Settings2,
    UserRound,
    LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../stores/authStore";

const ProfilePage = () => {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const menuItems = [
        {
            label: "Thông tin cá nhân",
            description: "Tên, email và ảnh đại diện",
            icon: UserRound,
            path: "/student/profile/personal",
            iconClass: "bg-[#EEEAFE] text-[#6C5CE7]",
        },
        {
            label: "Cài đặt",
            description: "Tùy chỉnh tài khoản",
            icon: Settings2,
            path: "/student/profile/settings",
            iconClass: "bg-[#EAF8F3] text-[#31A77A]",
        },
        {
            label: "Đổi mật khẩu",
            description: "Thay đổi mật khẩu tài khoản",
            icon: LockKeyhole,
            path: "/student/profile/password",
            iconClass: "bg-[#FFF3E5] text-[#E99A3D]",
        },
        {
            label: "Trợ giúp",
            description: "Hỗ trợ và giải đáp",
            icon: CircleHelp,
            path: "/student/profile/help",
            iconClass: "bg-[#EAF3FF] text-[#4A8FE7]",
        },
    ];

    const getInitial = (name) => {
        return name?.charAt(0)?.toUpperCase() || "U";
    };

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="relative min-h-full overflow-hidden bg-[#F8F7FF]">
            {/* Decorative background */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-[#DDD8FF]/70
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    top-32
                    h-56
                    w-56
                    rounded-full
                    bg-[#FFE1EC]/60
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-16
                    h-56
                    w-56
                    rounded-full
                    bg-[#DDF7EF]/60
                    blur-3xl
                "
            />

            {/* Decorative dots */}

            <span className="pointer-events-none absolute left-[10%] top-32 h-2 w-2 rounded-full bg-[#9C91F2]/50" />

            <span className="pointer-events-none absolute right-[12%] top-48 h-2.5 w-2.5 rounded-full bg-[#F5A8C5]/50" />

            <span className="pointer-events-none absolute bottom-36 right-[18%] h-2 w-2 rounded-full bg-[#65CBA8]/50" />

            {/* Content */}

            <div className="relative z-10 mx-auto w-full max-w-[375px] px-4 pb-8 pt-5">
                {/* Header */}

                <header className="mb-6 flex items-center justify-center">
                    <h1 className="text-[17px] font-semibold text-[#24234D]">
                        Hồ sơ
                    </h1>
                </header>

                {/* Profile */}

                <section className="flex flex-col items-center">
                    <div className="relative">
                        {/* Avatar */}

                        <div
                            className="
                                flex
                                h-[96px]
                                w-[96px]
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-full
                                border-4
                                border-white
                                bg-gradient-to-br
                                from-[#E5E1FF]
                                to-[#F3EFFF]
                                shadow-[0_8px_25px_rgba(108,92,231,0.14)]
                            "
                        >
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-[#6C5CE7]">
                                    {getInitial(user?.name)}
                                </span>
                            )}
                        </div>

                        {/* Avatar edit */}

                        <button
                            type="button"
                            aria-label="Đổi ảnh đại diện"
                            onClick={() =>
                                navigate(
                                    "/student/profile/personal"
                                )
                            }
                            className="
                                absolute
                                bottom-0
                                right-0
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                border-white
                                bg-[#6C5CE7]
                                text-white
                                shadow-md
                                transition
                                hover:scale-105
                                hover:bg-[#5B4BD6]
                                active:scale-95
                            "
                        >
                            <UserRound
                                size={14}
                                strokeWidth={1.8}
                            />
                        </button>
                    </div>

                    {/* Name */}

                    <h2 className="mt-3 text-[18px] font-semibold text-[#24234D]">
                        {user?.name || "Học sinh"}
                    </h2>

                    {/* Email */}

                    <p className="mt-0.5 max-w-[280px] truncate text-[13px] text-[#85839A]">
                        {user?.email || "Chưa cập nhật email"}
                    </p>

                    {/* Role */}

                    <div
                        className="
                            mt-2
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-white/80
                            px-3
                            py-1
                            text-[11px]
                            font-semibold
                            text-[#6C5CE7]
                            shadow-sm
                            ring-1
                            ring-[#E8E4FF]
                        "
                    >
                        <GraduationCap size={13} />

                        <span>Học sinh</span>
                    </div>
                </section>

                {/* Menu */}

                <section
                    className="
                        mt-7
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white
                        bg-white/90
                        shadow-[0_8px_30px_rgba(50,45,100,0.06)]
                        backdrop-blur-sm
                    "
                >
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() =>
                                    navigate(item.path)
                                }
                                className={`
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    px-4
                                    py-[14px]
                                    text-left
                                    transition
                                    hover:bg-[#F8F7FF]
                                    active:bg-[#F1EFFF]
                                    ${index !==
                                        menuItems.length - 1
                                        ? "border-b border-gray-100"
                                        : ""
                                    }
                                `}
                            >
                                {/* Icon */}

                                <div
                                    className={`
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${item.iconClass}
                                    `}
                                >
                                    <Icon
                                        size={17}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Text */}

                                <div className="min-w-0 flex-1">
                                    <p className="text-[14px] font-medium text-[#24234D]">
                                        {item.label}
                                    </p>

                                    <p className="mt-0.5 truncate text-[11px] text-[#9997AA]">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Arrow */}

                                <ChevronRight
                                    size={17}
                                    strokeWidth={1.8}
                                    className="shrink-0 text-[#B0AEC0]"
                                />
                            </button>
                        );
                    })}
                </section>

                {/* Logout */}

                <div className="mt-5 flex justify-center">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            group
                            flex
                            min-w-[150px]
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-[#FFD9E3]
                            bg-white
                            px-5
                            py-3
                            text-[14px]
                            font-semibold
                            text-[#E45878]
                            shadow-[0_6px_20px_rgba(228,88,120,0.08)]
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:border-[#E45878]
                            hover:bg-[#FFF3F6]
                            hover:shadow-[0_8px_24px_rgba(228,88,120,0.14)]
                            active:translate-y-0
                        "
                    >
                        <LogOut
                            size={17}
                            strokeWidth={1.9}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />

                        <span>Đăng xuất</span>
                    </button>
                </div>

                {/* App information */}
                <div className="mt-4 text-center">
                    <p className="text-[11px] font-medium text-[#A4A1B5]">
                        Stady
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#C0BDCB]">
                        Học tập mỗi ngày
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;