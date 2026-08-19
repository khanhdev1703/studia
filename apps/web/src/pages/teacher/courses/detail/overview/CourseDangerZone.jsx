import { Trash2 } from "lucide-react";

const CourseDangerZone = ({
    courseTitle,
    deleting,
    onDelete,
}) => {
    return (
        <section
            className="
                border
                border-red-100
                bg-white
                shadow-sm

                sm:rounded-md
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
                    Xoá khoá học
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
                                text-[11px]
                                leading-4
                                text-gray-400

                                sm:text-xs
                                sm:leading-5
                            "
                        >
                            Xóa vĩnh viễn
                            {courseTitle
                                ? ` "${courseTitle}"`
                                : ""}
                            . Hành động này sẽ xoá cả những bài trong khoá học.
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
                            rounded-md
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
                            : "Xóa"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CourseDangerZone;