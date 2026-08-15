import { NavLink } from "react-router-dom";

import Logo from "../../../components/common/Logo";
import teacherMenuItems from "./teacherMenu";

const TeacherSidebar = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-gray-100 bg-white lg:flex lg:flex-col">
            <div className="flex h-20 items-center border-b border-gray-100 px-6">
                <Logo showText />
            </div>

            <nav className="flex-1 space-y-1 px-4 py-6">
                {teacherMenuItems
                    .filter((item) => item.isShowMenu)
                    .map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    [
                                        "flex items-center gap-3 rounded-xl px-4 py-3",
                                        "text-sm font-medium transition",
                                        isActive
                                            ? "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-[#6C5CE7]",
                                    ].join(" ")
                                }
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
            </nav>
        </aside>
    );
};

export default TeacherSidebar;