import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const TABS = [
    { path: "", label: "Tổng quan", end: true },
    { path: "/lessons", label: "Bài học" },
    { path: "/students", label: "Học viên" },
];

const CourseDetailTabs = ({ courseId }) => {
    const location = useLocation();
    const tabsRef = useRef([]);
    const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        // Tìm index của tab đang active dựa trên đường dẫn URL
        const activeIndex = TABS.findIndex((tab) => {
            const fullPath = `/teacher/courses/${courseId}${tab.path}`;
            if (tab.end) return location.pathname === fullPath;
            return location.pathname.startsWith(fullPath);
        });

        if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
            const currentTab = tabsRef.current[activeIndex];
            setLineStyle({
                left: currentTab.offsetLeft,
                width: currentTab.clientWidth,
            });
        }
    }, [location.pathname, courseId]);

    return (
        <div className="overflow-x-auto border-b border-gray-200">
            <nav className="relative flex min-w-max gap-5">
                {TABS.map((tab, index) => (
                    <NavLink
                        key={tab.path}
                        ref={(el) => (tabsRef.current[index] = el)}
                        to={`/teacher/courses/${courseId}${tab.path}`}
                        end={tab.end}
                        className={({ isActive }) =>
                            `relative pb-2.5 text-sm font-medium transition-colors duration-200 ${isActive
                                ? "text-[#0a479d]"
                                : "text-gray-500 hover:text-gray-700"
                            }`
                        }
                    >
                        {tab.label}
                    </NavLink>
                ))}

                {/* Thanh gạch chân trượt mượt mà */}
                <span
                    className="absolute bottom-0 h-0.5 bg-[#0a479d] transition-all duration-300 ease-in-out"
                    style={{
                        left: `${lineStyle.left}px`,
                        width: `${lineStyle.width}px`,
                    }}
                />
            </nav>
        </div>
    );
};

export default CourseDetailTabs;