import {
    BookOpen,
    CalendarDays,
    Users,
} from "lucide-react";

const CourseStatistics = ({
    lessonCount,
    studentCount,
    createdAt,
    updatedAt,
}) => {
    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "vi-VN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }
        );
    };

    const stats = [
        {
            icon: BookOpen,
            value: lessonCount,
            label: "Bài học",
            className: "bg-[#6C5CE7]/5",
            iconClassName:
                "bg-[#6C5CE7]/10 text-[#6C5CE7]",
        },
        {
            icon: Users,
            value: studentCount,
            label: "Học viên",
            className: "bg-blue-50",
            iconClassName:
                "bg-blue-100 text-blue-500",
        },
        {
            icon: CalendarDays,
            value: formatDate(createdAt),
            label: "Ngày tạo",
            className: "bg-gray-50",
            iconClassName:
                "bg-gray-100 text-gray-500",
        },
        {
            icon: CalendarDays,
            value: formatDate(updatedAt),
            label: "Cập nhật",
            className: "bg-purple-50",
            iconClassName:
                "bg-purple-100 text-purple-500",
        },
    ];

    return (
        <section
            className="
                rounded-xl
                border
                border-gray-100
                bg-white
                p-4
                shadow-sm

                sm:rounded-2xl
                sm:p-5
            "
        >
            <h2
                className="
                    text-sm
                    font-semibold
                    text-[#252238]

                    sm:text-base
                "
            >
                Tổng quan
            </h2>

            <div
                className="
                    mt-3
                    grid
                    grid-cols-2
                    gap-2.5

                    sm:mt-4
                    sm:gap-3

                    lg:grid-cols-4
                "
            >
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className={`
                                min-w-0
                                rounded-lg
                                p-3

                                sm:rounded-xl
                                sm:p-3.5

                                ${stat.className}
                            `}
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className={`
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg

                                        sm:h-9
                                        sm:w-9

                                        ${stat.iconClassName}
                                    `}
                                >
                                    <Icon
                                        size={16}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p
                                        className="
                                            truncate
                                            text-sm
                                            font-bold
                                            text-[#252238]

                                            sm:text-lg
                                        "
                                    >
                                        {stat.value}
                                    </p>

                                    <p
                                        className="
                                            truncate
                                            text-[10px]
                                            text-gray-500

                                            sm:text-[11px]
                                        "
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CourseStatistics;