import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

import Logo from "../../../components/common/Logo";
import useAuthStore from "../../../stores/authStore";
import studentMenuItems from "./studentMenuItems";

const StudentSidebar = () => {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <aside
            className={[
                "fixed inset-y-0 left-0 z-40",
                "hidden lg:flex",
                "w-64 flex-col",
                "border-r border-[#E5E7EB]",
                "bg-white",
            ].join(" ")}
        >
            <div className="flex h-16 shrink-0 items-center px-5">
                <Logo />
            </div>

            <div className="mx-4 h-px bg-[#E5E7EB]" />

            <nav
                aria-label="Điều hướng chính"
                className="flex-1 px-3 py-5"
            >
                <div className="space-y-1">
                    {studentMenuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    [
                                        "group relative flex items-center gap-3",
                                        "rounded-lg px-3 py-2.5 pl-4",
                                        "text-[14px] font-medium",
                                        isActive
                                            ? "bg-[#F1F2F4] text-[#18181B]"
                                            : "text-[#52525B] hover:bg-[#F6F6F7] hover:text-[#18181B]",
                                    ].join(" ")
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={[
                                                "absolute left-0 top-1/2",
                                                "-translate-y-1/2",
                                                "h-5 w-[3px]",
                                                "rounded-r-full",
                                                isActive
                                                    ? "bg-[#18181B]"
                                                    : "opacity-0",
                                            ].join(" ")}
                                        />

                                        <Icon
                                            size={19}
                                            strokeWidth={
                                                isActive
                                                    ? 2.1
                                                    : 1.8
                                            }
                                            className={
                                                isActive
                                                    ? "text-[#18181B]"
                                                    : "text-[#71717A] group-hover:text-[#18181B]"
                                            }
                                        />

                                        <span>
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            <div className="border-t border-[#E5E7EB] p-3">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F0F1] text-[#52525B]">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                className="h-full w-full rounded-full object-cover"
                            />
                        ) : (
                            <User size={18} strokeWidth={1.8} />
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-[#18181B]">
                            {user?.fullName ||
                                user?.name ||
                                "Học viên"}
                        </p>

                        <p className="truncate text-[12px] text-[#A1A1AA]">
                            {user?.email ||
                                "Tài khoản học viên"}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className={[
                        "mt-2 flex w-full items-center gap-3",
                        "rounded-lg px-3 py-2.5",
                        "text-[14px] font-medium text-[#71717A]",
                        "transition-colors duration-150",
                        "hover:bg-[#FEF2F2]",
                        "hover:text-[#DC2626]",
                    ].join(" ")}
                >
                    <LogOut size={18} strokeWidth={1.9} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;