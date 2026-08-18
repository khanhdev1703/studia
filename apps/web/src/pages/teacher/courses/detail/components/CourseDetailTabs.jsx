import { NavLink } from "react-router-dom";

const CourseDetailTabs = ({ courseId }) => {
    return (
        <div className="overflow-x-auto border-b border-gray-200">
            <nav
                className="
                        flex
                        min-w-max
                        gap-5
                    "
            >
                {/* Overview */}
                <NavLink
                    to={`/teacher/courses/${courseId}`}
                    end
                    className={({ isActive }) =>
                        `
                            relative
                            pb-2
                            text-sm
                            font-medium
                            transition

                            ${isActive
                            ? "text-[#6C5CE7]"
                            : "text-gray-500 hover:text-gray-700"
                        }
                            `
                    }
                >
                    {({ isActive }) => (
                        <>
                            Tổng quan

                            {isActive && (
                                <span
                                    className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-0.5
                                            w-full
                                            rounded-full
                                            bg-[#6C5CE7]
                                        "
                                />
                            )}
                        </>
                    )}
                </NavLink>

                {/* Lessons */}
                <NavLink
                    to={`/teacher/courses/${courseId}/lessons`}
                    className={({ isActive }) =>
                        `
                            relative
                            pb-2
                            text-sm
                            font-medium
                            transition

                            ${isActive
                            ? "text-[#6C5CE7]"
                            : "text-gray-500 hover:text-gray-700"
                        }
                            `
                    }
                >
                    {({ isActive }) => (
                        <>
                            Bài học

                            {isActive && (
                                <span
                                    className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-0.5
                                            w-full
                                            rounded-full
                                            bg-[#6C5CE7]
                                        "
                                />
                            )}
                        </>
                    )}
                </NavLink>

                {/* Students */}
                <NavLink
                    to={`/teacher/courses/${courseId}/students`}
                    className={({ isActive }) =>
                        `
                            relative
                            pb-3
                            text-sm
                            font-medium
                            transition

                            ${isActive
                            ? "text-[#6C5CE7]"
                            : "text-gray-500 hover:text-gray-700"
                        }
                            `
                    }
                >
                    {({ isActive }) => (
                        <>
                            Học viên

                            {isActive && (
                                <span
                                    className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-0.5
                                            w-full
                                            rounded-full
                                            bg-[#6C5CE7]
                                        "
                                />
                            )}
                        </>
                    )}
                </NavLink>
            </nav>
        </div >
    )
}

export default CourseDetailTabs;