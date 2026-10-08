import { useRef } from "react";
import {
    ImagePlus,
    Save,
    Loader2,
    Upload,
} from "lucide-react";

import getUrl from "../../../../../utils/getUrl";

const CourseBasicInfo = ({
    form,
    thumbnailPreview,
    saving,
    onFormChange,
    onSelectImage,
    onSave,
}) => {
    const fileInputRef = useRef(null);
    const isPublished = form.status === true;

    const handleThumbnailClick = () => {
        if (saving) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        onSelectImage(file);
        event.target.value = "";
    };

    const handleStatusToggle = () => {
        if (saving) return;

        onFormChange("status", !form.status);
    };

    const inputClass = [
        "w-full rounded-xl border border-[#E4E4E7]",
        "bg-white px-3.5 py-2.5",
        "text-sm text-[#18181B]",
        "placeholder:text-[#A1A1AA]",
        "transition-colors",
        "focus:border-[#2563EB]",
        "focus:outline-none",
        "focus:ring-2 focus:ring-[#DBEAFE]",
        "disabled:cursor-not-allowed",
        "disabled:bg-[#F8F8F7]",
        "disabled:text-[#A1A1AA]",
    ].join(" ");

    const labelClass =
        "mb-1.5 block text-xs font-medium text-[#3F3F46]";

    return (
        <form
            onSubmit={onSave}
            className="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white"
        >
            {/* Header */}
            <div className="border-b border-[#F4F4F5] px-4 py-4 sm:px-5">
                <h2 className="text-sm font-semibold text-[#18181B]">
                    Thông tin khóa học
                </h2>

                <p className="mt-0.5 text-[11px] text-[#A1A1AA]">
                    Cập nhật nội dung, giá và trạng thái khóa học.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-6 p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                    {/* Thumbnail */}
                    <div>
                        <label className={labelClass}>
                            Ảnh khóa học
                        </label>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <button
                            type="button"
                            onClick={handleThumbnailClick}
                            disabled={saving}
                            className={[
                                "group relative block aspect-video w-full",
                                "overflow-hidden rounded-xl",
                                "border border-[#E4E4E7]",
                                "bg-[#F8F8F7]",
                                "transition-colors",
                                "hover:border-[#BFDBFE]",
                                "disabled:cursor-not-allowed",
                                "disabled:opacity-60",
                            ].join(" ")}
                        >
                            {thumbnailPreview ? (
                                <>
                                    <img
                                        src={getUrl(thumbnailPreview)}
                                        alt={
                                            form.title ||
                                            "Thumbnail khóa học"
                                        }
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#3F3F46] shadow-sm">
                                            <Upload
                                                size={14}
                                                className="text-[#2563EB]"
                                            />
                                            Đổi ảnh
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#A1A1AA] shadow-sm">
                                        <ImagePlus size={19} />
                                    </div>

                                    <p className="mt-2 text-xs font-medium text-[#3F3F46]">
                                        Tải ảnh lên
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-[#A1A1AA]">
                                        PNG, JPG hoặc WEBP
                                    </p>
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Fields */}
                    <div className="space-y-5">
                        {/* Course title */}
                        <div>
                            <label
                                htmlFor="course-title"
                                className={labelClass}
                            >
                                Tên khóa học
                            </label>

                            <input
                                id="course-title"
                                type="text"
                                value={form.title}
                                onChange={(event) =>
                                    onFormChange(
                                        "title",
                                        event.target.value
                                    )
                                }
                                placeholder="Ví dụ: Lập trình ReactJS từ cơ bản đến nâng cao"
                                disabled={saving}
                                className={inputClass}
                            />
                        </div>

                        {/* Price + Duration */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="course-price"
                                    className={labelClass}
                                >
                                    Giá khóa học
                                </label>

                                <div className="relative">
                                    <input
                                        id="course-price"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={form.price ?? ""}
                                        onChange={(event) =>
                                            onFormChange(
                                                "price",
                                                event.target.value
                                            )
                                        }
                                        placeholder="0"
                                        disabled={saving}
                                        className={`${inputClass} pr-20`}
                                    />

                                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#A1A1AA]">
                                        nghìn VNĐ
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="course-duration"
                                    className={labelClass}
                                >
                                    Thời hạn truy cập
                                </label>

                                <div className="relative">
                                    <input
                                        id="course-duration"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={
                                            form.durationMonths ?? ""
                                        }
                                        onChange={(event) =>
                                            onFormChange(
                                                "durationMonths",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Ví dụ: 6"
                                        disabled={saving}
                                        className={`${inputClass} pr-16`}
                                    />

                                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#A1A1AA]">
                                        Tháng
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] leading-4 text-[#A1A1AA]">
                            Giá = 0 nếu miễn phí. Thời hạn = 0 hoặc
                            để trống nếu học trọn đời.
                        </p>

                        {/* Status */}
                        <div className="flex items-center justify-between border-t border-[#F4F4F5] pt-5">
                            <div>
                                <p className="text-xs font-medium text-[#3F3F46]">
                                    Trạng thái khóa học
                                </p>

                                <p className="mt-0.5 text-[10px] text-[#A1A1AA]">
                                    {isPublished
                                        ? "Khóa học đang công khai"
                                        : "Khóa học đang tạm đóng"}
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={isPublished}
                                disabled={saving}
                                onClick={handleStatusToggle}
                                className={[
                                    "relative h-5 w-9 shrink-0 rounded-full",
                                    "transition-colors",
                                    "focus:outline-none",
                                    "focus:ring-2 focus:ring-[#DBEAFE]",
                                    "disabled:cursor-not-allowed",
                                    "disabled:opacity-50",
                                    isPublished
                                        ? "bg-[#2563EB]"
                                        : "bg-[#D4D4D8]",
                                ].join(" ")}
                            >
                                <span
                                    className={[
                                        "absolute top-0.5 h-4 w-4 rounded-full",
                                        "bg-white shadow-sm",
                                        "transition-transform",
                                        isPublished
                                            ? "translate-x-4"
                                            : "translate-x-0.5",
                                    ].join(" ")}
                                />
                            </button>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="course-description"
                                className={labelClass}
                            >
                                Mô tả ngắn
                            </label>

                            <textarea
                                id="course-description"
                                rows={4}
                                value={form.description}
                                onChange={(event) =>
                                    onFormChange(
                                        "description",
                                        event.target.value
                                    )
                                }
                                placeholder="Tóm tắt ngắn gọn nội dung và giá trị khóa học..."
                                disabled={saving}
                                className={[
                                    inputClass,
                                    "resize-none leading-5",
                                ].join(" ")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-[#F4F4F5] px-4 py-3 sm:px-5">
                <button
                    type="submit"
                    disabled={saving}
                    className={[
                        "inline-flex w-full items-center justify-center gap-2",
                        "rounded-xl bg-[#18181B]",
                        "px-4 py-2.5",
                        "text-xs font-semibold text-white",
                        "transition-colors",
                        "hover:bg-[#27272A]",
                        "focus:outline-none",
                        "focus:ring-2 focus:ring-[#D4D4D8]",
                        "disabled:cursor-not-allowed",
                        "disabled:opacity-60",
                        "sm:w-auto",
                    ].join(" ")}
                >
                    {saving ? (
                        <>
                            <Loader2
                                size={15}
                                className="animate-spin"
                            />
                            Đang lưu...
                        </>
                    ) : (
                        <>
                            <Save size={15} />
                            Lưu thay đổi
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CourseBasicInfo;