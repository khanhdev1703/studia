import { NavLink } from "react-router-dom";

const TABS = [
    {
        path: "",
        label: "Tổng quan",
        end: true,
    },
    {
        path: "/lessons",
        label: "Bài học",
    },
    {
        path: "/students",
        label: "Học viên",
    },
];

const CourseDetailTabs = ({ courseId }) => {
    return (
        <div className="border-b border-gray-200 bg-white">
            <nav
                className={[
                    "flex",
                    "min-w-max",
                    "gap-1",
                    "overflow-x-auto",
                    "px-3",

                    // Hide scrollbar
                    "[scrollbar-width:none]",
                    "[&::-webkit-scrollbar]:hidden",

                    // Desktop
                    "lg:px-5",
                    "lg:gap-2",
                ].join(" ")}
            >
                {TABS.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={`/teacher/courses/${courseId}${tab.path}`}
                        end={tab.end}
                        className={({ isActive }) =>
                            [
                                // Layout
                                "relative shrink-0",
                                "px-3",
                                "py-3",

                                // Typography
                                "text-[13px] font-medium",
                                "whitespace-nowrap",

                                // Transition
                                "transition-colors duration-150",

                                // Mobile touch target
                                "min-h-11",

                                // Active / inactive
                                isActive
                                    ? "text-[#0A479D]"
                                    : [
                                        "text-[#71717A]",
                                        "hover:text-[#3F3F46]",
                                    ].join(" "),

                                // Active underline
                                "after:absolute",
                                "after:bottom-0",
                                "after:left-2",
                                "after:right-2",
                                "after:h-0.5",
                                "after:rounded-t-full",
                                "after:transition-opacity",
                                isActive
                                    ? "after:bg-[#0A479D] after:opacity-100"
                                    : "after:bg-transparent after:opacity-0",
                            ].join(" ")
                        }
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default CourseDetailTabs;