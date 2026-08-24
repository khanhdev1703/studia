import {
    ChevronRight,
    LockKeyhole,
    LogOut,
    UserRound,
    Pencil,
} from "lucide-react";

import useAuthStore from "../../../stores/authStore";

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = logout;

    const menuItems = [
        {
            label: "Thông tin cá nhân",
            description: "Tên, email và ảnh đại diện",
            icon: UserRound,
            path: "/teacher/profile/personal",
        },
        {
            label: "Đổi mật khẩu",
            description: "Thay đổi mật khẩu tài khoản",
            icon: LockKeyhole,
            path: "/teacher/profile/password",
        },
        // {
        //     label: "Cài đặt",
        //     description: "Tùy chỉnh tài khoản",
        //     icon: Settings2,
        //     path: "/teacher/profile/settings",
        // },
        // {
        //     label: "Trợ giúp",
        //     description: "Hỗ trợ và giải đáp",
        //     icon: CircleHelp,
        //     path: "/teacher/profile/help",
        // },
    ];

    const getInitial = (name) => {
        return name?.charAt(0)?.toUpperCase() || "U";
    };

    return (
        <div className="relative min-h-full overflow-hidden bg-[#F5F3FF]">
            {/* =========================
                Decorative background
            ========================== */}

            {/* Purple blob */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-[#DCD5FF]
                    opacity-70
                    blur-3xl
                "
            />

            {/* Blue blob */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    top-[260px]
                    h-56
                    w-56
                    rounded-full
                    bg-[#DCEBFF]
                    opacity-60
                    blur-3xl
                "
            />

            {/* Pink blob */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    top-[430px]
                    h-52
                    w-52
                    rounded-full
                    bg-[#FFE2F0]
                    opacity-50
                    blur-3xl
                "
            />

            {/* Decorative circles */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-5
                    top-10
                    h-3
                    w-3
                    rounded-full
                    bg-[#8B7CF6]
                    opacity-60
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-8
                    top-32
                    h-2
                    w-2
                    rounded-full
                    bg-[#5B8DEF]
                    opacity-70
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    left-10
                    top-[410px]
                    h-2
                    w-2
                    rounded-full
                    bg-[#F59E0B]
                    opacity-60
                "
            />

            {/* =========================
                Content
            ========================== */}

            <div className="relative z-10 mx-auto w-full max-w-[375px] p-4">

                {/* Header */}
                <header className="mb-5 flex items-center justify-center">
                    <h1 className="text-[18px] font-semibold text-[#211C4A]">
                        Hồ sơ
                    </h1>
                </header>

                {/* =========================
                    Profile Hero
                ========================== */}

                <section className="flex flex-col items-center">

                    {/* Avatar */}
                    <div className="relative">

                        {/* Outer glow */}
                        <div
                            className="
                                absolute
                                inset-[-8px]
                                rounded-full
                                bg-gradient-to-br
                                from-[#CFC7FF]
                                via-[#E9E5FF]
                                to-[#DCEBFF]
                                opacity-70
                                blur-md
                            "
                        />

                        {/* Avatar */}
                        <div
                            className="
                                relative
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
                                from-[#DED8FF]
                                via-[#ECEAFF]
                                to-[#DDEBFF]
                                shadow-[0_8px_25px_rgba(108,92,231,0.18)]
                            "
                        >
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-[34px] font-semibold text-[#6C5CE7]">
                                    {getInitial(user?.name)}
                                </span>
                            )}
                        </div>

                        {/* Edit avatar */}
                        <button
                            type="button"
                            aria-label="Đổi ảnh đại diện"
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
                                border-[3px]
                                border-white
                                bg-[#6C5CE7]
                                text-white
                                shadow-[0_4px_10px_rgba(108,92,231,0.35)]
                                transition
                                hover:bg-[#5B4BD6]
                                active:scale-95
                            "
                        >
                            <Pencil
                                size={13}
                                strokeWidth={2}
                            />
                        </button>
                    </div>

                    {/* Name */}
                    <h2 className="mt-3 text-[19px] font-semibold text-[#211C4A]">
                        {user?.name}
                    </h2>

                    {/* Email */}
                    <p className="mt-0.5 text-[13px] text-[#77738F]">
                        {user?.email}
                    </p>

                    {/* Role */}
                    <div
                        className="
                            mt-2
                            rounded-full
                            bg-gradient-to-r
                            from-[#EDE9FF]
                            to-[#F1EEFF]
                            px-3.5
                            py-1
                            text-[11px]
                            font-semibold
                            text-[#6C5CE7]
                            shadow-sm
                            ring-1
                            ring-[#DDD7FF]
                        "
                    >
                        Giáo viên
                    </div>
                </section>

                {/* =========================
                    Menu
                ========================== */}

                <section
                    className="
        mt-7
        overflow-hidden
        rounded-xl
        border
        border-white/80
        bg-white/90
        shadow-[0_8px_30px_rgba(68,55,130,0.08)]
        backdrop-blur-sm
    "
                >
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                type="button"
                                className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-[14px]
                    text-left
                    transition
                    hover:bg-[#FAFAFF]
                    active:bg-[#F4F1FF]
                    ${index !== menuItems.length - 1
                                        ? "border-b border-[#F0EEF8]"
                                        : ""
                                    }
                `}
                            >
                                {/* Icon */}
                                <div
                                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-[11px]
                        bg-[#F5F4FA]
                        text-[#56516F]
                    "
                                >
                                    <Icon
                                        size={17}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Text */}
                                <div className="min-w-0 flex-1">
                                    <p className="text-[13px] font-semibold text-[#211C4A]">
                                        {item.label}
                                    </p>

                                    <p className="mt-0.5 truncate text-[11px] text-[#9995AA]">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <ChevronRight
                                    size={17}
                                    strokeWidth={1.8}
                                    className="
                        shrink-0
                        text-[#AAA6BB]
                        transition-all
                        group-hover:translate-x-0.5
                        group-hover:text-[#6C5CE7]
                    "
                                />
                            </button>
                        );
                    })}
                </section>

                {/* =========================
                    Logout
                ========================== */}

                <div className="mt-5 flex justify-center">
                    <button
                        type="button"
                        className="
            flex
            min-w-[150px]
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-red-100
            bg-white
            px-6
            py-3
            text-[13px]
            font-semibold
            text-[#EF4444]
            shadow-[0_6px_20px_rgba(239,68,68,0.08)]
            transition-all
            hover:border-red-200
            hover:bg-[#FFF6F6]
            hover:shadow-[0_8px_24px_rgba(239,68,68,0.12)]
            active:scale-95
        "
                        onClick={handleLogout}
                    >
                        <LogOut
                            size={16}
                            strokeWidth={1.9}
                        />

                        <span>Đăng xuất</span>
                    </button>
                </div>

                {/* =========================
                    Branding
                ========================== */}

                <div className="mt-6 text-center">
                    <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#8B7CF6]" />

                    <p className="text-[11px] font-semibold text-[#A39EBB]">
                        Stady
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;