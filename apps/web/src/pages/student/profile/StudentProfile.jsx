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
        },
        // {
        //     label: "Cài đặt",
        //     description: "Tùy chỉnh tài khoản",
        //     icon: Settings2,
        //     path: "/student/profile/settings",
        // },
        {
            label: "Đổi mật khẩu",
            description: "Thay đổi mật khẩu tài khoản",
            icon: LockKeyhole,
            path: "/student/profile/password",
        },
        {
            label: "Trợ giúp",
            description: "Hỗ trợ và giải đáp",
            icon: CircleHelp,
            path: "/student/profile/help",
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
        <div className="min-h-full bg-[#FAFAFA] text-[#18181B]">
            {/* HEADER */}
            <header className="border-b border-[#E4E4E7] bg-white">
                <div className="mx-auto flex h-14 w-full max-w-[720px] items-center px-4 sm:px-6">
                    <h1 className="text-[17px] font-semibold text-[#18181B]">
                        Hồ sơ
                    </h1>
                </div>
            </header>

            <div className="mx-auto w-full max-w-[720px] px-4 pb-10 pt-5 sm:px-6">
                {/* PROFILE CARD */}
                <section className="rounded-2xl border border-[#E4E4E7] bg-white px-5 py-6 shadow-[0_4px_18px_rgba(0,0,0,0.03)]">
                    <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                        {/* AVATAR */}
                        <div className="relative shrink-0">
                            <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-[#EFF6FF] ring-1 ring-[#DBEAFE]">
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-semibold text-[#2563EB]">
                                        {getInitial(user?.name)}
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                aria-label="Đổi ảnh đại diện"
                                onClick={() =>
                                    navigate("/student/profile/personal")
                                }
                                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#2563EB] text-white shadow-sm transition hover:bg-[#1D4ED8] active:scale-95"
                            >
                                <UserRound
                                    size={13}
                                    strokeWidth={1.8}
                                />
                            </button>
                        </div>

                        {/* USER INFO */}
                        <div className="mt-4 min-w-0 sm:ml-5 sm:mt-0">
                            <h2 className="truncate text-[17px] font-semibold text-[#18181B]">
                                {user?.name || "Học sinh"}
                            </h2>

                            <p className="mt-1 max-w-[280px] truncate text-[12px] text-[#71717A] sm:max-w-[360px]">
                                {user?.email || "Chưa cập nhật email"}
                            </p>

                            <div className="mt-2.5 flex items-center justify-center gap-2 sm:justify-start">
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-medium text-[#2563EB]">
                                    <GraduationCap
                                        size={13}
                                        strokeWidth={1.8}
                                    />
                                    <span>Học sinh</span>
                                </div>

                                {user?.studentCode && (
                                    <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[10px] font-medium text-[#52525B]">
                                        {user.studentCode}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* MENU */}
                <section className="mt-5 overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.03)]">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => navigate(item.path)}
                                className={`flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition hover:bg-[#FAFAFA] active:bg-[#F4F4F5] ${index !== menuItems.length - 1
                                    ? "border-b border-[#F0F0F1]"
                                    : ""
                                    }`}
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F4F5] text-[#52525B]">
                                    <Icon
                                        size={17}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-[13px] font-medium text-[#18181B]">
                                        {item.label}
                                    </p>

                                    <p className="mt-0.5 truncate text-[11px] text-[#71717A]">
                                        {item.description}
                                    </p>
                                </div>

                                <ChevronRight
                                    size={17}
                                    strokeWidth={1.7}
                                    className="shrink-0 text-[#A1A1AA]"
                                />
                            </button>
                        );
                    })}
                </section>

                {/* LOGOUT */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-white py-3 text-[13px] font-medium text-[#DC2626] transition hover:bg-[#FEF2F2] active:bg-[#FEE2E2]"
                >
                    <LogOut
                        size={16}
                        strokeWidth={1.8}
                    />

                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;