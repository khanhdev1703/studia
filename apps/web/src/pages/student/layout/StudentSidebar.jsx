import { NavLink } from "react-router-dom";

import studentMenu from "./studentMenu"

import Logo from "../../../components/common/Logo";

const StudentSidebar = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-gray-100 bg-white lg:block">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-20 items-center px-6">
                    <Logo
                        showText
                        size="md"
                        border={false}
                    />
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4">
                    <div className="space-y-1">
                        {studentMenu.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        [
                                            "flex items-center gap-3 rounded-xl px-4 py-3",
                                            "text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-[#EEEAFE] text-[#6C5CE7]"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                                        ].join(" ")
                                    }
                                >
                                    <Icon
                                        size={20}
                                        strokeWidth={1.8}
                                    />

                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default StudentSidebar;