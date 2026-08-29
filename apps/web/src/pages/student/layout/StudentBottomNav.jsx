import { NavLink } from "react-router-dom";

import studentMenuItems from "./studentMenu";

const StudentBottomNav = () => {
    return (
        <nav
            className="
                shrink-0
                border-t
                border-[#E8E5F2]
                bg-white
                shadow-[0_-8px_25px_rgba(36,35,77,0.08)]
                lg:hidden
            "
        >
            <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
                {studentMenuItems
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
                                        "flex flex-col items-center justify-center gap-1",
                                        "rounded-md px-3 py-1.5",
                                        "text-[11px] font-medium",
                                        "transition-all duration-200",
                                        "min-w-[64px]",
                                        isActive
                                            ? "bg-[#EEEAFE] text-[#6C5CE7]"
                                            : "text-[#9B98AD] hover:bg-[#F7F6FF] hover:text-[#6C5CE7]",
                                    ].join(" ")
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={20}
                                            strokeWidth={
                                                isActive ? 2 : 1.8
                                            }
                                        />

                                        <span>{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
            </div>
        </nav>
    );
};

export default StudentBottomNav;