import { Save } from "lucide-react";

import CourseThumbnail from "./CourseThumbnail";

const CourseBasicInfo = ({
    title,
    description,
    status,
    thumbnailPreview,
    saving,
    onTitleChange,
    onDescriptionChange,
    onStatusChange,
    onSelectImage,
    onSave,
}) => {
    const isPublished = status === "PUBLISHED";

    return (
        <section
            className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
            "
        >
            {/* Header */}


            {/* Content */}
            <div
                className="
                    p-4

                    sm:p-5

                    md:p-6
                "
            >
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-6

                        md:grid-cols-[180px_minmax(0,1fr)]
                        md:gap-7

                        lg:grid-cols-[200px_minmax(0,1fr)]
                        lg:gap-8
                    "
                >
                    {/* Thumbnail */}
                    <div>
                        <CourseThumbnail
                            preview={thumbnailPreview}
                            onSelect={onSelectImage}
                        />
                    </div>

                    {/* Form */}
                    <div className="min-w-0 space-y-5">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="course-title"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Tên khóa học
                            </label>

                            <input
                                id="course-title"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    onTitleChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Nhập tên khóa học"
                                className="
                                    mt-2
                                    block
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3.5
                                    py-2.5
                                    text-sm
                                    text-[#252238]
                                    outline-none
                                    transition

                                    placeholder:text-gray-400

                                    hover:border-gray-300

                                    focus:border-[#6C5CE7]
                                    focus:ring-2
                                    focus:ring-[#6C5CE7]/10
                                "
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="course-description"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Mô tả
                            </label>

                            <textarea
                                id="course-description"
                                value={description}
                                onChange={(event) =>
                                    onDescriptionChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Nhập mô tả khóa học"
                                rows={5}
                                className="
                                    mt-2
                                    block
                                    min-h-[120px]
                                    w-full
                                    resize-y
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3.5
                                    py-3
                                    text-sm
                                    leading-6
                                    text-[#252238]
                                    outline-none
                                    transition

                                    placeholder:text-gray-400

                                    hover:border-gray-300

                                    focus:border-[#6C5CE7]
                                    focus:ring-2
                                    focus:ring-[#6C5CE7]/10
                                "
                            />
                        </div>

                        {/* Status */}
                        <div
                            className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-gray-100
        bg-gray-50
        px-3.5
        py-3
        sm:px-4
    "
                        >
                            <div className="flex min-w-0 items-center gap-2.5">
                                <p className="text-sm font-medium text-gray-700">
                                    Trạng thái
                                </p>
                            </div>

                            <div className="flex gap-3 ">
                                <span
                                    className={`
                inline-flex
                items-center
                rounded-sm
                px-2.5
                py-1
                text-[12px]
                font-semibold

                ${status === "PUBLISHED"
                                            ? "bg-green-200 text-green-800"
                                            : "bg-gray-100 text-gray-500"
                                        }
            `}
                                >
                                    {status === "PUBLISHED"
                                        ? "Công khai"
                                        : "Nháp"}
                                </span>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={status === "PUBLISHED"}
                                    disabled={saving}
                                    onClick={() =>
                                        onStatusChange(
                                            status === "PUBLISHED"
                                                ? "DRAFT"
                                                : "PUBLISHED"
                                        )
                                    }
                                    className={`
            relative
            flex
            h-6
            w-11
            shrink-0
            items-center
            rounded-full
            p-0.5
            transition-colors
            duration-200

            focus:outline-none
            focus:ring-2
            focus:ring-[#6C5CE7]/20
            focus:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-60

            ${status === "PUBLISHED"
                                            ? "bg-[#6C5CE7]"
                                            : "bg-gray-300"
                                        }
        `}
                                >
                                    <span
                                        className={`
                block
                h-5
                w-5
                rounded-full
                bg-white
                shadow-sm
                transition-transform
                duration-200

                ${status === "PUBLISHED"
                                                ? "translate-x-5"
                                                : "translate-x-0"
                                            }
            `}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className="
                    flex
                    flex-col-reverse
                    gap-2
                    border-t
                    border-gray-100
                    px-4
                    py-3

                    sm:flex-row
                    sm:items-center
                    sm:justify-end
                    sm:px-5
                    sm:py-4
                "
            >
                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    className="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#6C5CE7]
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition

                        hover:bg-[#5b4bd6]

                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#6C5CE7]/20
                        focus:ring-offset-2

                        disabled:cursor-not-allowed
                        disabled:opacity-60

                        sm:w-auto
                    "
                >
                    <Save size={16} />

                    {saving
                        ? "Đang lưu..."
                        : "Lưu thay đổi"}
                </button>
            </div>
        </section>
    );
};

export default CourseBasicInfo;