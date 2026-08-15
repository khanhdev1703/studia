import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    LogOut,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import useAuthStore from "../../../stores/authStore";
import authService from "../../../services/authService";
import appToast from "../../../utils/toast";

const TeacherAccountMenu = () => {
    const user = useAuthStore((state) => state.user);

    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = () => {
        authService.logout();

        setIsOpen(false);

        appToast.success("Đã đăng xuất.");
    };

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={() =>
                    setIsOpen((prev) => !prev)
                }
                className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-50"
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6C5CE7]/10 text-sm font-semibold text-[#6C5CE7]">
                    {user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "T"}
                </div>

                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${isOpen
                            ? "rotate-180"
                            : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 top-12 z-50 w-48 rounded-2xl border border-gray-100 bg-white p-1 shadow-lg"
                >
                    <Link
                        to="/teacher/profile"
                        role="menuitem"
                        onClick={() =>
                            setIsOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        <UserRound size={18} />

                        <span>Hồ sơ</span>
                    </Link>

                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50"
                    >
                        <LogOut size={18} />

                        <span>Đăng xuất</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default TeacherAccountMenu;