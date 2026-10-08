import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";

import Logo from "../../../components/common/Logo";
import useAuthStore from "../../../stores/authStore";
import teacherMenuItems from "./teacherMenuItems";

const TeacherSidebar = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    const renderNavigation = (isMobile = false) => {
        return (
            <nav className="flex-1 overflow-y-auto px-3 py-5">
                <div className="space-y-6">
                    {teacherMenuItems.map((section) => {
                        const visibleItems = section.items.filter(
                            (item) => item.isShowMenu
                        );

                        if (!visibleItems.length) {
                            return null;
                        }

                        return (
                            <div key={section.section}>
                                {/* SECTION TITLE */}
                                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
                                    {section.section}
                                </p>

                                {/* MENU ITEMS */}
                                <div className="space-y-1">
                                    {visibleItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                end={item.end}
                                                onClick={
                                                    isMobile
                                                        ? closeMobileMenu
                                                        : undefined
                                                }
                                                className={({
                                                    isActive,
                                                }) =>
                                                    [
                                                        "group relative flex items-center gap-3",
                                                        "rounded-lg px-3 py-2.5 pl-4",
                                                        "text-[14px] font-medium",
                                                        "transition-all duration-150",

                                                        isActive
                                                            ? "bg-[#F1F2F4] text-[#18181B]"
                                                            : [
                                                                "text-[#52525B]",
                                                                "hover:bg-[#F6F6F7]",
                                                                "hover:text-[#18181B]",
                                                            ].join(" "),
                                                    ].join(" ")
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        {/* ACTIVE INDICATOR */}
                                                        <span
                                                            className={[
                                                                "absolute left-0 top-1/2",
                                                                "-translate-y-1/2",
                                                                "h-5 w-[3px]",
                                                                "rounded-r-full",
                                                                "transition-opacity duration-150",
                                                                isActive
                                                                    ? "bg-[#18181B] opacity-100"
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
                                                            className={[
                                                                "transition-colors duration-150",
                                                                isActive
                                                                    ? "text-[#18181B]"
                                                                    : "text-[#71717A] group-hover:text-[#18181B]",
                                                            ].join(" ")}
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
                            </div>
                        );
                    })}
                </div>
            </nav>
        );
    };

    const renderProfile = () => {
        const displayName =
            user?.fullName || user?.name || "Giáo viên";

        const email =
            user?.email || "Tài khoản giáo viên";

        return (
            <div className="border-t border-[#E5E7EB] p-3">
                {/* PROFILE */}
                <div className="flex items-center gap-3 px-2 py-2">
                    <div
                        className={[
                            "flex h-9 w-9 shrink-0",
                            "items-center justify-center",
                            "rounded-full",
                            "bg-[#F0F0F1]",
                            "text-[#52525B]",
                        ].join(" ")}
                    >
                        <User size={17} strokeWidth={1.9} />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-[#18181B]">
                            {displayName}
                        </p>

                        <p className="truncate text-[12px] text-[#A1A1AA]">
                            {email}
                        </p>
                    </div>
                </div>

                {/* LOGOUT */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className={[
                        "mt-2 flex w-full items-center gap-3",
                        "rounded-lg px-3 py-2.5",
                        "text-[14px] font-medium",
                        "text-[#71717A]",
                        "transition-colors duration-150",
                        "hover:bg-[#FEF2F2]",
                        "hover:text-[#DC2626]",
                    ].join(" ")}
                >
                    <LogOut size={18} strokeWidth={1.9} />

                    <span>Đăng xuất</span>
                </button>
            </div>
        );
    };

    return (
        <>
            {/* =========================================================
                DESKTOP SIDEBAR
            ========================================================= */}
            <aside
                className={[
                    "fixed inset-y-0 left-0 z-40",
                    "hidden lg:flex",
                    "w-64",
                    "flex-col",
                    "border-r border-[#E5E7EB]",
                    "bg-[#FAFAFA]",
                ].join(" ")}
            >
                {/* LOGO */}
                <div className="flex h-16 shrink-0 items-center px-5">
                    <Logo />
                </div>

                {/* DIVIDER */}
                <div className="mx-4 h-px bg-[#E5E7EB]" />

                {/* NAVIGATION */}
                {renderNavigation()}

                {/* PROFILE */}
                {renderProfile()}
            </aside>

            {/* =========================================================
                MOBILE HEADER
            ========================================================= */}
            <header
                className={[
                    "flex h-16 lg:hidden",
                    "items-center justify-between",
                    "border-b border-[#E5E7EB]",
                    "bg-white",
                    "px-4",
                ].join(" ")}
            >
                <Logo />

                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Mở menu"
                    className={[
                        "flex h-10 w-10 items-center justify-center",
                        "rounded-lg",
                        "text-[#52525B]",
                        "transition-colors duration-150",
                        "hover:bg-[#F0F0F1]",
                        "hover:text-[#18181B]",
                    ].join(" ")}
                >
                    <Menu size={22} strokeWidth={2} />
                </button>
            </header>

            {/* =========================================================
                MOBILE OVERLAY
            ========================================================= */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Đóng menu"
                    onClick={closeMobileMenu}
                    className={[
                        "fixed inset-0 z-[60]",
                        "bg-[#18181B]/30",
                        "lg:hidden",
                    ].join(" ")}
                />
            )}

            {/* =========================================================
                MOBILE DRAWER
            ========================================================= */}
            <aside
                className={[
                    "fixed inset-y-0 left-0 z-[70]",
                    "flex lg:hidden",
                    "w-[280px] max-w-[85vw]",
                    "flex-col",
                    "bg-[#FAFAFA]",
                    "shadow-xl",
                    "transition-transform duration-300 ease-out",
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full",
                ].join(" ")}
            >
                {/* DRAWER HEADER */}
                <div className="flex h-16 shrink-0 items-center justify-between px-4">
                    <Logo />

                    <button
                        type="button"
                        onClick={closeMobileMenu}
                        aria-label="Đóng menu"
                        className={[
                            "flex h-10 w-10 items-center justify-center",
                            "rounded-lg",
                            "text-[#52525B]",
                            "transition-colors duration-150",
                            "hover:bg-[#F0F0F1]",
                            "hover:text-[#18181B]",
                        ].join(" ")}
                    >
                        <X size={22} strokeWidth={2} />
                    </button>
                </div>

                {/* DIVIDER */}
                <div className="mx-4 h-px bg-[#E5E7EB]" />

                {/* NAVIGATION */}
                {renderNavigation(true)}

                {/* PROFILE */}
                {renderProfile()}
            </aside>
        </>
    );
};

export default TeacherSidebar;