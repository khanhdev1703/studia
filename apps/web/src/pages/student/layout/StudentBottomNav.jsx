import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import studentMenuItems from "./studentMenuItems";

const StudentBottomNav = () => {
    const location = useLocation();

    const navRef = useRef(null);
    const itemRefs = useRef({});

    const [indicatorX, setIndicatorX] = useState(0);
    const [indicatorVisible, setIndicatorVisible] = useState(false);

    const getActiveItem = () => {
        return studentMenuItems.find((item) => {
            if (item.end) {
                return location.pathname === item.path;
            }

            return (
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`)
            );
        });
    };

    const updateIndicator = () => {
        const nav = navRef.current;
        const activeItem = getActiveItem();

        if (!nav || !activeItem) return;

        const activeElement = itemRefs.current[activeItem.path];

        if (!activeElement) return;

        const navRect = nav.getBoundingClientRect();
        const itemRect = activeElement.getBoundingClientRect();

        const indicatorWidth = 40;

        const x =
            itemRect.left -
            navRect.left +
            (itemRect.width - indicatorWidth) / 2;

        setIndicatorX(x);
        setIndicatorVisible(true);
    };

    useLayoutEffect(() => {
        updateIndicator();

        window.addEventListener("resize", updateIndicator);

        return () => {
            window.removeEventListener("resize", updateIndicator);
        };
    }, [location.pathname]);

    return (
        <nav
            ref={navRef}
            aria-label="Điều hướng chính"
            className="fixed inset-x-0 bottom-0 z-50 flex h-16 border-t border-[#E5E7EB] bg-white lg:hidden"
        >
            {/* Một thanh duy nhất — thanh này sẽ di chuyển */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-[3px] w-10 rounded-b-full bg-[#18181B] transition-transform duration-300 ease-out"
                style={{
                    transform: `translate3d(${indicatorX}px, 0, 0)`,
                    opacity: indicatorVisible ? 1 : 0,
                }}
            />

            {studentMenuItems.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.path}
                        ref={(element) => {
                            itemRefs.current[item.path] = element;
                        }}
                        className="flex flex-1"
                    >
                        <NavLink
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                [
                                    "relative flex flex-1 flex-col items-center justify-center gap-1",
                                    "text-[11px] font-medium",
                                    "transition-colors duration-200",
                                    isActive
                                        ? "text-[#18181B]"
                                        : "text-[#71717A]",
                                ].join(" ")
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={21}
                                        strokeWidth={isActive ? 2 : 1.8}
                                    />

                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    </div>
                );
            })}
        </nav>
    );
};

export default StudentBottomNav;