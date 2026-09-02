import { useRef } from "react";
import {
    ImagePlus,
    Save,
    Loader2,
    BookOpen,
    DollarSign,
    FileText,
    Upload,
    Clock,
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
        if (saving) {
            return;
        }

        onFormChange("status", !form.status);
    };

    return (
        <form
            onSubmit={onSave}
            className="overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
        >
            {/* Content */}
            <div className="space-y-6 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:items-start">

                    {/* Cột trái: Thumbnail & Trạng thái */}
                    <div className="space-y-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Ảnh đại diện khóa học
                            </label>

                            <button
                                type="button"
                                onClick={handleThumbnailClick}
                                disabled={saving}
                                className="group relative block aspect-video w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 transition-all hover:border-[#0a479d] hover:bg-[#0a479d]/5 focus:outline-none focus:ring-2 focus:ring-[#0a479d]/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {thumbnailPreview ? (
                                    <>
                                        <img
                                            src={getUrl(thumbnailPreview)}
                                            alt={form.title || "Thumbnail khóa học"}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-sm">
                                                <Upload size={14} className="text-[#0a479d]" />
                                                Đổi ảnh khác
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-slate-400 group-hover:text-[#0a479d]">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                                            <ImagePlus size={20} />
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-xs font-semibold text-slate-700 group-hover:text-[#0a479d]">
                                                Tải ảnh lên
                                            </span>
                                            <span className="text-[10px] text-slate-400">PNG, JPG hoặc WEBP</span>
                                        </div>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Trạng thái Switch Card */}
                        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                            <div>
                                <p className="text-xs font-semibold text-slate-700">Trạng thái khóa học</p>
                                <p className="text-[11px] text-slate-500">
                                    {isPublished
                                        ? "Đang công khai"
                                        : "Đang tạm đóng"}
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={isPublished}
                                disabled={saving}
                                onClick={handleStatusToggle}
                                className={`
        relative inline-flex h-5 w-9 shrink-0
        items-center rounded-full
        transition-colors duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-[#244DA8]/20
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${isPublished
                                        ? "bg-[#244DA8]"
                                        : "bg-slate-300"
                                    }
    `}
                            >
                                <span
                                    className={`
            inline-block h-4 w-4
            rounded-full bg-white
            shadow-md
            transition-transform duration-200
            ${isPublished
                                            ? "translate-x-4.5"
                                            : "translate-x-0.5"
                                        }
        `}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Cột phải: Các trường dữ liệu */}
                    <div className="space-y-4">

                        {/* Tên khóa học */}
                        <div>
                            <label
                                htmlFor="course-title"
                                className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                <BookOpen size={14} className="text-[#0a479d]" />
                                Tên khóa học
                            </label>
                            <input
                                id="course-title"
                                type="text"
                                value={form.title}
                                onChange={(event) => onFormChange("title", event.target.value)}
                                placeholder="Ví dụ: Lập trình ReactJS từ cơ bản đến nâng cao..."
                                disabled={saving}
                                className="w-full rounded-sm border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-[#0a479d] focus:outline-none focus:ring-4 focus:ring-[#0a479d]/10 disabled:bg-slate-50 disabled:text-slate-400"
                            />
                        </div>

                        {/* Hàng chứa: Giá & Thời hạn truy cập */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Giá khóa học */}
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    <DollarSign size={14} className="text-[#0a479d]" />
                                    Giá khóa học
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={form.price ?? ""}
                                        onChange={(e) => onFormChange("price", e.target.value)}
                                        placeholder="0"
                                        disabled={saving}
                                        className="w-full rounded-sm border border-slate-200 bg-white py-2.5 pl-3.5 pr-20 text-sm font-medium text-slate-800 transition focus:border-[#0a479d] focus:outline-none focus:ring-4 focus:ring-[#0a479d]/10 disabled:bg-slate-50"
                                    />
                                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-sm bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
                                        nghìn VNĐ
                                    </div>
                                </div>
                            </div>

                            {/* Thời hạn truy cập (Tháng) */}
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    <Clock size={14} className="text-[#0a479d]" />
                                    Thời hạn truy cập
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={form.durationMonths ?? ""}
                                        onChange={(e) => onFormChange("durationMonths", e.target.value)}
                                        placeholder="Ví dụ: 6"
                                        disabled={saving}
                                        className="w-full rounded-sm border border-slate-200 bg-white py-2.5 pl-3.5 pr-16 text-sm font-medium text-slate-800 transition focus:border-[#0a479d] focus:outline-none focus:ring-4 focus:ring-[#0a479d]/10 disabled:bg-slate-50"
                                    />
                                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-sm bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
                                        Tháng
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ghi chú dưới ô Giá & Thời hạn */}
                        <p className="text-[11px] text-slate-400">
                            * Nhập <span className="font-semibold text-slate-600">Giá = 0</span> nếu miễn phí. Để <span className="font-semibold text-slate-600">Thời hạn = 0</span> hoặc trống nếu học trọn đời (không giới hạn).
                        </p>

                        {/* Mô tả */}
                        <div>
                            <label
                                htmlFor="course-description"
                                className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                <FileText size={14} className="text-[#0a479d]" />
                                Mô tả ngắn
                            </label>
                            <textarea
                                id="course-description"
                                rows={4}
                                value={form.description}
                                onChange={(event) =>
                                    onFormChange("description", event.target.value)
                                }
                                placeholder="Tóm tắt ngắn gọn nội dung kiến thức và giá trị khóa học mang lại..."
                                disabled={saving}
                                className="w-full resize-none rounded-sm border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-800 transition focus:border-[#0a479d] focus:outline-none focus:ring-2 focus:ring-[#0a479d]/10 disabled:bg-slate-50"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3.5">
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#0a479d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#083b82] hover:shadow focus:outline-none focus:ring-4 focus:ring-[#0a479d]/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    {saving ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Đang lưu thay đổi...
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            Lưu thông tin
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CourseBasicInfo;