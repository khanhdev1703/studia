import { ArrowLeft, ImagePlus } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import courseService from "../../../../services/courseService";

const CourseCreatePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const [thumbnailPreview, setThumbnailPreview] =
        useState("");

    const [loading, setLoading] = useState(false);

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

        setThumbnail(file);

        const previewUrl = URL.createObjectURL(file);

        setThumbnailPreview(previewUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!title.trim()) {
            toast.error("Vui lòng nhập tên khóa học.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", title.trim());
            formData.append(
                "description",
                description.trim()
            );

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

    const handleBack = () => {
        if (loading) return;

        navigate("/teacher/courses");
    };

    return (
        <div className="mx-auto w-full max-w-3xl space-y-2">
            {/* Header */}
            <div className="p-4 bg-white relative">
                <div
                    onClick={handleBack}
                    disabled={loading}
                    className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#6C5CE7] disabled:cursor-not-allowed"
                >
                    <ArrowLeft size={18} />
                </div>

                <h1 className="text-xl text-center font-bold text-[#252238]">
                    Tạo khóa học
                </h1>

                {/* <p className="mt-1 text-sm text-gray-500">
                    Tạo một khóa học mới để bắt đầu xây dựng
                    nội dung giảng dạy.
                </p> */}
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
            >
                <div className="space-y-6">
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
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                        />

                        <p className="mt-1.5 text-xs text-gray-400">
                            {title.length}/150
                        </p>
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
                            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 disabled:bg-gray-100"
                        />

                        <p className="mt-1.5 text-xs text-gray-400">
                            {description.length}/1000
                        </p>
                    </div>

                    {/* Thumbnail */}
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
                                    onClick={() => {
                                        setThumbnail(null);
                                        setThumbnailPreview("");

                                        if (
                                            fileInputRef.current
                                        ) {
                                            fileInputRef.current.value =
                                                "";
                                        }
                                    }}
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
                                    PNG, JPG hoặc WEBP · tối đa 5MB
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={loading}
                        className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Hủy
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-[#6C5CE7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5b4bd6] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Đang tạo..."
                            : "Tạo khóa học"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseCreatePage;