import { BookOpen, ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Breadcrumb from "../../../../components/common/Breadcrumb";
import courseService from "../../../../services/courseService";

const CourseCreatePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [durationMonths, setDurationMonths] = useState(3);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState("");

    const [loading, setLoading] = useState(false);

    /*
     * ==========================================
     * CLEANUP PREVIEW URL
     * ==========================================
     */

    useEffect(() => {
        return () => {
            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);

    /*
     * ==========================================
     * THUMBNAIL
     * ==========================================
     */

    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Vui lòng chọn một file hình ảnh.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            toast.error("Ảnh không được vượt quá 5MB.");
            return;
        }

        if (thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);
        }

        const previewUrl = URL.createObjectURL(file);

        setThumbnail(file);
        setThumbnailPreview(previewUrl);
    };

    const handleRemoveThumbnail = () => {
        if (thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);
        }

        setThumbnail(null);
        setThumbnailPreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    /*
     * ==========================================
     * SUBMIT
     * ==========================================
     */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!title.trim()) {
            toast.error("Vui lòng nhập tên khóa học.");
            return;
        }

        if (price !== "") {
            const parsedPrice = Number(price);

            if (
                !Number.isInteger(parsedPrice) ||
                parsedPrice < 0
            ) {
                toast.error("Giá khóa học không hợp lệ.");
                return;
            }
        }

        if (durationMonths !== "") {
            const parsedDuration = Number(durationMonths);

            if (
                !Number.isInteger(parsedDuration) ||
                parsedDuration <= 0
            ) {
                toast.error("Thời hạn khóa học không hợp lệ.");
                return;
            }
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", title.trim());

            formData.append(
                "description",
                description.trim()
            );

            if (price !== "") {
                formData.append("price", Number(price));
            }

            if (durationMonths !== "") {
                formData.append(
                    "durationMonths",
                    Number(durationMonths)
                );
            }

            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            const response =
                await courseService.createCourse(formData);

            toast.success(
                response.message ||
                "Tạo khóa học thành công."
            );

            navigate("/teacher/courses");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Không thể tạo khóa học."
            );
        } finally {
            setLoading(false);
        }
    };

    /*
     * ==========================================
     * BACK
     * ==========================================
     */

    const handleBack = () => {
        if (loading) return;

        navigate("/teacher/courses");
    };

    /*
     * ==========================================
     * RENDER
     * ==========================================
     */

    return (
        <div className="min-h-full bg-[#F7F7FF] pb-6">
            {/* ==========================================
                Breadcrumb
            ========================================== */}

            <div className="sticky top-0 z-30 border-b border-gray-100 bg-white px-4 py-3">
                <Breadcrumb
                    items={[
                        {
                            label: "Khóa học",
                            to: "/teacher/courses",
                            icon: BookOpen,
                        },
                        {
                            label: "Tạo khóa học",
                        },
                    ]}
                />
            </div>

            {/* ==========================================
                Content
            ========================================== */}

            <div className="mx-auto w-full max-w-4xl p-2">
                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="rounded-md border border-gray-100 bg-white p-4 shadow-sm"
                >
                    <div className="space-y-4">
                        {/* Title */}

                        <div>
                            <label
                                htmlFor="course-title"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Tên khóa học
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                id="course-title"
                                type="text"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                placeholder="Ví dụ: React cơ bản"
                                disabled={loading}
                                maxLength={150}
                                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                            />
                        </div>

                        {/* Description */}

                        <div>
                            <label
                                htmlFor="course-description"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Mô tả
                            </label>

                            <textarea
                                id="course-description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Giới thiệu ngắn gọn về khóa học..."
                                disabled={loading}
                                rows={5}
                                maxLength={1000}
                                className="w-full resize-none rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                            />
                        </div>

                        {/* ==========================================
                            Pricing & duration
                        ========================================== */}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {/* Price */}

                            <div>
                                <label
                                    htmlFor="course-price"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Giá khóa học
                                </label>

                                <div className="relative">
                                    <input
                                        id="course-price"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                        disabled={loading}
                                        className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 pr-16 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                                    />

                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                                        nghìn
                                    </span>
                                </div>

                                <p className="mt-1.5 text-xs text-gray-400">
                                    Nhập 0 nếu khóa học miễn phí.
                                </p>
                            </div>

                            {/* Duration */}

                            <div>
                                <label
                                    htmlFor="course-duration"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Thời hạn khóa học
                                </label>

                                <div className="relative">
                                    <input
                                        id="course-duration"
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={durationMonths}
                                        onChange={(e) =>
                                            setDurationMonths(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Ví dụ: 3"
                                        disabled={loading}
                                        className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 pr-16 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                                    />

                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                                        tháng
                                    </span>
                                </div>

                                <p className="mt-1.5 text-xs text-gray-400">
                                    Có thể để trống nếu không
                                    giới hạn thời hạn.
                                </p>
                            </div>
                        </div>

                        {/* ==========================================
                            Thumbnail
                        ========================================== */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Ảnh khóa học
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                disabled={loading}
                                className="hidden"
                            />

                            {thumbnailPreview ? (
                                <div className="relative overflow-hidden rounded-xl border border-gray-200">
                                    <img
                                        src={thumbnailPreview}
                                        alt="Xem trước ảnh khóa học"
                                        className="aspect-video w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            handleRemoveThumbnail
                                        }
                                        disabled={loading}
                                        className="absolute right-3 top-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-black/80 disabled:cursor-not-allowed"
                                    >
                                        Xóa ảnh
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={loading}
                                    className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 transition hover:border-[#6C5CE7]/50 hover:bg-[#6C5CE7]/5 hover:text-[#6C5CE7] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <ImagePlus size={32} />

                                    <span className="mt-2 text-sm font-medium">
                                        Chọn ảnh khóa học
                                    </span>

                                    <span className="mt-1 text-xs">
                                        PNG, JPG hoặc WEBP · tối đa
                                        5MB
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ==========================================
                        Actions
                    ========================================== */}

                    <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#E4E1F2] pt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={loading}
                            className="
            rounded-sm
            border border-[#E4E1F2]
            bg-white
            px-5 py-2.5
            text-sm font-semibold
            text-[#5F5A78]
            transition
            hover:border-[#244DA8]/30
            hover:bg-[#F5F8FF]
            hover:text-[#244DA8]
            focus:outline-none
            focus:ring-2
            focus:ring-[#244DA8]/20
            disabled:cursor-not-allowed
            disabled:opacity-60
        "
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
            rounded-sm
            bg-[#244DA8]
            px-5 py-2.5
            text-sm font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#1D408F]
            hover:shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-[#244DA8]/30
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:shadow-none
        "
                        >
                            {loading ? "Đang tạo..." : "Tạo khóa học"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseCreatePage;