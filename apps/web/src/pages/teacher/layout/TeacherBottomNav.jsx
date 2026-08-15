import { NavLink } from "react-router-dom";

import teacherMenuItems from "./teacherMenu";

const TeacherBottomNav = () => {
    return (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white lg:hidden">
            <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
                {teacherMenuItems.filter((item) => item.isShowMenu).map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                [
                                    "flex flex-col items-center justify-center gap-1",
                                    "rounded-xl px-4 py-2 text-[11px] font-medium",
                                    isActive
                                        ? "text-[#6C5CE7]"
                                        : "text-gray-400",
                                ].join(" ")
                            }
                        >
                            <Icon size={20} />

                            <span>
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
};

export default TeacherBottomNav;