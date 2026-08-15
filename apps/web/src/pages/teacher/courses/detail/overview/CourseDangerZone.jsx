import { Trash2 } from "lucide-react";

const CourseDangerZone = ({
    courseTitle,
    deleting,
    onDelete,
}) => {
    return (
        <section
            className="
                rounded-xl
                border
                border-red-100
                bg-white
                shadow-sm

                sm:rounded-2xl
            "
        >
            <div className="p-4 sm:p-5">
                <h2
                    className="
                        text-sm
                        font-semibold
                        text-red-600

                        sm:text-base
                    "
                >
                    Khu vực nguy hiểm
                </h2>

                <div
                    className="
                        mt-3
                        space-y-3

                        sm:flex
                        sm:items-center
                        sm:justify-between
                        sm:gap-5
                        sm:space-y-0
                    "
                >
                    <div className="min-w-0">
                        <p
                            className="
                                text-xs
                                font-medium
                                text-gray-700

                                sm:text-sm
                            "
                        >
                            Xóa khóa học
                        </p>

                        <p
                            className="
                                mt-1
                                text-[11px]
                                leading-4
                                text-gray-400

                                sm:text-xs
                                sm:leading-5
                            "
                        >
                            Xóa vĩnh viễn khóa học
                            {courseTitle
                                ? ` "${courseTitle}"`
                                : ""}
                            . Hành động này không thể
                            hoàn tác.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onDelete}
                        disabled={deleting}
                        className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-red-200
                            px-3
                            py-2
                            text-xs
                            font-medium
                            text-red-500
                            transition
                            hover:bg-red-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50

                            sm:w-auto
                            sm:shrink-0
                            sm:text-sm
                        "
                    >
                        <Trash2 size={15} />

                        {deleting
                            ? "Đang xóa..."
                            : "Xóa khóa học"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CourseDangerZone;