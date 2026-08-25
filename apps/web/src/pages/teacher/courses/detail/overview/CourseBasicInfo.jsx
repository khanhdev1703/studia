import { useRef } from "react";
import {
    ImagePlus,
    Save,
    Loader2,
} from "lucide-react";
import getImageUrl from "../../../../../utils/getImageUrl";

const CourseBasicInfo = ({
    form,
    thumbnailPreview,
    saving,
    onFormChange,
    onSelectImage,
    onSave,
}) => {
    const fileInputRef = useRef(null);

    const isPublished = form.status === "PUBLISHED";

    const handleThumbnailClick = () => {
        if (saving) {
            return;
        }

        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        onSelectImage(file);

        // Cho phép chọn lại cùng một file
        event.target.value = "";
    };

    const handleStatusToggle = () => {
        onFormChange(
            "status",
            isPublished
                ? "DRAFT"
                : "PUBLISHED"
        );
    };

    return (
        <form
            onSubmit={onSave}
            className="
                overflow-hidden
                border
                border-gray-100
                bg-white
                shadow-sm
            "
        >

            {/* Content */}
            <div
                className="
                    space-y-5
                    p-3
                    sm:p-5
                "
            >
                {/* Thumbnail + Status */}
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5

                        lg:grid-cols-[280px_minmax(0,1fr)]
                        lg:items-start
                    "
                >
                    {/* Thumbnail */}
                    <div className="w-full">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="
                                image/jpeg,
                                image/png,
                                image/webp
                            "
                            className="hidden"
                            onChange={
                                handleFileChange
                            }
                        />

                        <button
                            type="button"
                            onClick={
                                handleThumbnailClick
                            }
                            disabled={saving}
                            className="
                                group
                                relative
                                block
                                aspect-video
                                w-full
                                overflow-hidden
                                rounded-sm
                                border
                                border-gray-200
                                bg-gray-100
                                text-left
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#6C5CE7]/30
                                disabled:cursor-not-allowed
                            "
                        >
                            {thumbnailPreview ? (
                                <img
                                    src={getImageUrl(thumbnailPreview)}
                                    alt={form.title || "Thumbnail khóa học"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-full
                                        w-full
                                        flex-col
                                        items-center
                                        justify-center
                                        gap-2
                                        text-gray-400
                                    "
                                >
                                    <ImagePlus
                                        size={28}
                                    />

                                    <span
                                        className="
                                            text-xs
                                        "
                                    >
                                        Thêm ảnh
                                    </span>
                                </div>
                            )}

                            {/* Hover overlay */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-black/0
                                    opacity-0
                                    transition
                                    group-hover:bg-black/30
                                    group-hover:opacity-100
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-md
                                        bg-white/95
                                        px-3
                                        py-2
                                        text-xs
                                        font-medium
                                        text-gray-700
                                        shadow-sm
                                    "
                                >
                                    <ImagePlus
                                        size={15}
                                    />

                                    Đổi ảnh
                                </div>
                            </div>
                        </button>

                        {/* Status */}
                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                justify-between
                                rounded-md
                                border
                                border-gray-100
                                bg-gray-50
                                px-3
                                py-2.5
                            "
                        >
                            <div className="min-w-0">
                                <p
                                    className="
                                        text-xs
                                        font-medium
                                        text-gray-500
                                    "
                                >
                                    Trạng thái
                                </p>
                            </div>

                            {/* Switch */}
                            <div className="flex gap-2 items-center">
                                <span
                                    className={`
                                        inline-flex
                                        items-center
                                        rounded-full
                                        px-2
                                        py-0.5
                                        text-xs
                                        font-medium
                                        ${isPublished
                                            ? "bg-green-50 text-green-600"
                                            : "bg-amber-50 text-amber-600"
                                        }
                                    `}
                                >
                                    {isPublished
                                        ? "Mở"
                                        : "Khoá"}
                                </span>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={
                                        isPublished
                                    }
                                    disabled={saving}
                                    onClick={
                                        handleStatusToggle
                                    }
                                    className={`
                                    relative
                                    inline-flex
                                    h-5
                                    w-11
                                    shrink-0
                                    items-center
                                    rounded-full
                                    transition-colors
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-[#6C5CE7]/30
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    ${isPublished
                                            ? "bg-green-600"
                                            : "bg-gray-300"
                                        }
                                `}
                                >
                                    <span
                                        className={`
                                        inline-block
                                        h-4
                                        w-4
                                        rounded-full
                                        bg-white
                                        shadow-sm
                                        transition-transform
                                        ${isPublished
                                                ? "translate-x-6"
                                                : "translate-x-0.5"
                                            }
                                    `}
                                    />
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="course-title"
                                className="
                                    mb-1.5
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
                                value={
                                    form.title
                                }
                                onChange={(event) =>
                                    onFormChange(
                                        "title",
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="Nhập tên khóa học"
                                disabled={saving}
                                className="
                                    w-full
                                    rounded-md
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
                                    focus:border-[#6C5CE7]
                                    focus:ring-2
                                    focus:ring-[#6C5CE7]/10
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        <div>
                            <label
                                className="
            mb-1.5
            block
            text-[12px]
            font-medium
            text-[#55536A]
        "
                            >
                                Giá khóa học
                            </label>

                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={form.price ?? ""}
                                    onChange={(e) =>
                                        onFormChange(
                                            "price",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                    disabled={saving}
                                    className="
                w-full
                rounded-md
                border
                border-[#E6E4EF]
                bg-white
                px-3
                py-2.5
                pr-12
                text-[12px]
                text-[#24234D]
                outline-none
                transition
                focus:border-[#CFC9FF]
                focus:ring-4
                focus:ring-[#6C5CE7]/10
                disabled:bg-gray-50
            "
                                />

                                <span
                                    className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[11px]
                font-medium
                text-[#9997AA]
            "
                                >
                                    nghìn
                                </span>
                            </div>

                            <p className="mt-1 text-[10px] text-[#9997AA]">
                                Nhập 0 nếu khóa học miễn phí.
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="course-description"
                                className="
                                    mb-1.5
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
                                rows={5}
                                value={
                                    form.description
                                }
                                onChange={(event) =>
                                    onFormChange(
                                        "description",
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="Nhập mô tả khóa học"
                                disabled={saving}
                                className="
                                    w-full
                                    resize-none
                                    rounded-md
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3.5
                                    py-2.5
                                    text-sm
                                    leading-6
                                    text-[#252238]
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-[#6C5CE7]
                                    focus:ring-2
                                    focus:ring-[#6C5CE7]/10
                                    disabled:bg-gray-50
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className="
                    flex
                    justify-end
                    border-t
                    border-gray-100
                    px-4
                    py-3
                    sm:px-5
                "
            >
                <button
                    type="submit"
                    disabled={saving}
                    className="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-md
                        bg-[#6C5CE7]
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-[#5b4bd5]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#6C5CE7]/30
                        disabled:cursor-not-allowed
                        disabled:opacity-60

                        sm:w-auto
                    "
                >
                    {saving ? (
                        <>
                            <Loader2
                                size={17}
                                className="animate-spin"
                            />

                            Đang lưu...
                        </>
                    ) : (
                        <>
                            <Save size={17} />

                            Lưu thay đổi
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CourseBasicInfo;