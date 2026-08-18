import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteCourseModal = ({
    open,
    courseTitle,
    deleting,
    onClose,
    onConfirm,
}) => {
    const [confirmText, setConfirmText] =
        useState("");

    useEffect(() => {
        if (open) {
            setConfirmText("");
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const canDelete =
        confirmText === courseTitle;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-4
            "
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >
            <div
                className="
                    w-full
                    max-w-md
                    rounded-md
                    bg-white
                    shadow-xl
                "
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                        border-b
                        border-gray-100
                        px-5
                        py-4
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-red-50
                                text-red-500
                            "
                        >
                            <AlertTriangle
                                size={18}
                            />
                        </div>

                        <h2
                            className="
                                    text-base
                                    font-semibold
                                    text-gray-900
                                "
                        >
                            Xóa khóa học
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleting}
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-600
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}

                <div className="px-5 py-5">

                    <p
                        className="
                            text-sm
                            leading-6
                            text-gray-600
                        "
                    >
                        Để xác nhận, hãy nhập chính xác
                        tên khóa học vào ô bên dưới.
                    </p>

                    <input
                        type="text"
                        value={confirmText}
                        onChange={(event) =>
                            setConfirmText(
                                event.target.value
                            )
                        }
                        placeholder={courseTitle}
                        disabled={deleting}
                        autoFocus
                        className="
                            mt-3
                            w-full
                            rounded-md
                            border
                            border-gray-200
                            px-3
                            py-2.5
                            text-sm
                            text-gray-900
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-red-400
                            focus:ring-2
                            focus:ring-red-100
                            disabled:bg-gray-100
                        "
                    />
                </div>

                {/* Footer */}

                <div
                    className="
                        flex
                        flex-row
                        justify-end
                        gap-2
                        border-t
                        border-gray-100
                        px-5
                        py-4
                    "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleting}
                        className="
                            rounded-md
                            border
                            border-gray-200
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-600
                            transition
                            hover:bg-gray-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Hủy
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={
                            !canDelete ||
                            deleting
                        }
                        className="
                            rounded-md
                            bg-red-500
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-600
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        {deleting
                            ? "Đang xóa..."
                            : "Xóa"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCourseModal;