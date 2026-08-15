import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

import Logo from "../../../components/common/Logo";
import TeacherAccountMenu from "./TeacherAccountMenu";
import teacherMenuItems from "./teacherMenu";

const TeacherHeader = () => {
    const location = useLocation();

    const currentMenu = teacherMenuItems.find((item) => {
        if (item.end) {
            return location.pathname === item.path;
        }

        return location.pathname.startsWith(item.path);
    });

    return (
        <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Desktop: Page title */}
                <h1 className="hidden text-lg font-semibold text-[#252238] lg:block">
                    {currentMenu?.label || "Teacher"}
                </h1>

                {/* Mobile: Logo */}
                <div className="lg:hidden">
                    <Logo
                        size="sm"
                        showText
                        border={false}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Notification */}
                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-50 hover:text-[#6C5CE7]"
                        aria-label="Thông báo"
                    >
                        <Bell size={20} />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#6C5CE7]" />
                    </button>

                    {/* Account */}
                    <TeacherAccountMenu />
                </div>
            </div>
        </header>
    );
};

export default TeacherHeader;