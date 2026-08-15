import { ImagePlus } from "lucide-react";

const CourseThumbnail = ({
    preview,
    onSelect,
}) => {
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            onSelect(file);
        }

        event.target.value = "";
    };

    return (
        <div>
            <p
                className="
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                    md:mb-4
                "
            >
                Ảnh khóa học
            </p>

            <label
                className="
        group
        relative
        block
        w-full
        cursor-pointer
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-gray-50

        aspect-video

        md:aspect-auto
        md:h-[110px]
        md:w-[175px]

        lg:h-[120px]
        lg:w-[190px]
    "
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Course thumbnail"
                        className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-200
                            group-hover:scale-105
                        "
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
                            gap-1.5
                            text-gray-400
                        "
                    >
                        <ImagePlus size={24} />

                        <span className="text-[11px]">
                            Chọn ảnh
                        </span>
                    </div>
                )}

                {/* Hover overlay */}
                {preview && (
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-black/40
                            opacity-0
                            transition
                            group-hover:opacity-100
                        "
                    >
                        <span
                            className="
                                rounded-lg
                                bg-white/90
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-gray-700
                            "
                        >
                            Đổi ảnh
                        </span>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            <p
                className="
                    mt-1.5
                    text-[10px]
                    text-gray-400

                    md:max-w-[190px]
                "
            >
                JPG, PNG hoặc WebP · tối đa 5MB
            </p>
        </div>
    );
};

export default CourseThumbnail;