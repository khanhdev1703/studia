import { useState } from "react";
import { X, Search, CalendarDays } from "lucide-react";

import appToast from "../../../../../utils/toast";
import enrollmentService from "../../../../../services/enrollmentService";

const STATUS_CONFIG = {
    NOT_ENROLLED: {
        label: "Chưa tham gia",
        className: "border-blue-100 bg-blue-50 text-blue-700",
    },
    ACTIVE: {
        label: "Đang tham gia",
        className: "border-emerald-100 bg-emerald-50 text-emerald-700",
    },
    EXPIRED: {
        label: "Đã hết hạn",
        className: "border-red-100 bg-red-50 text-red-700",
    },
};

const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const toInputDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const AddStudentModal = ({
    open,
    courseId,
    onClose,
    onAdded,
}) => {
    const [studentCode, setStudentCode] = useState("");
    const [checking, setChecking] = useState(false);
    const [adding, setAdding] = useState(false);
    const [checkResult, setCheckResult] = useState(null);
    const [expiresAt, setExpiresAt] = useState("");

    if (!open) {
        return null;
    }

    const status = checkResult?.status || null;
    const statusConfig = status
        ? STATUS_CONFIG[status]
        : null;

    const student = checkResult?.student || null;
    const enrollment = checkResult?.enrollment || null;
    const prediction = checkResult?.prediction || null;

    const canAdd = status === "NOT_ENROLLED";
    const isProcessing = checking || adding;

    // ==========================================
    // Check student
    // ==========================================

    const handleCheck = async (e) => {
        e.preventDefault();

        const trimmedStudentCode = studentCode.trim();

        if (!trimmedStudentCode) {
            appToast.error("Vui lòng nhập mã học sinh.");
            return;
        }

        if (!courseId) {
            return;
        }

        try {
            setChecking(true);

            const response =
                await enrollmentService.checkEnrollment(
                    courseId,
                    trimmedStudentCode
                );

            const result = response.data;

            setCheckResult(result);

            // Backend đề xuất ngày hết hạn mặc định
            if (
                result?.status === "NOT_ENROLLED" &&
                result?.prediction?.nextExpiresAt
            ) {
                setExpiresAt(
                    toInputDate(
                        result.prediction.nextExpiresAt
                    )
                );
            } else {
                setExpiresAt("");
            }
        } catch (error) {
            console.error(error);

            setCheckResult(null);
            setExpiresAt("");

            appToast.error(
                error?.response?.data?.message ||
                "Không thể kiểm tra học sinh."
            );
        } finally {
            setChecking(false);
        }
    };

    // ==========================================
    // Add student
    // ==========================================

    const handleAdd = async () => {
        if (
            !courseId ||
            !checkResult?.student ||
            checkResult.status !== "NOT_ENROLLED"
        ) {
            return;
        }

        if (!expiresAt) {
            appToast.error("Vui lòng chọn ngày hết hạn.");
            return;
        }

        try {
            setAdding(true);

            const response =
                await enrollmentService.enrollStudent(
                    courseId,
                    checkResult.student.studentCode,
                    {
                        expiresAt,
                    }
                );

            if (onAdded) {
                onAdded(response.data);
            }

            appToast.success(
                "Thêm học sinh thành công."
            );

            handleClose();
        } catch (error) {
            console.error(error);

            appToast.error(
                error?.response?.data?.message ||
                "Không thể thêm học sinh."
            );
        } finally {
            setAdding(false);
        }
    };

    // ==========================================
    // Close
    // ==========================================

    const handleClose = () => {
        if (isProcessing) {
            return;
        }

        setStudentCode("");
        setCheckResult(null);
        setExpiresAt("");

        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 backdrop-blur-[2px]"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    handleClose();
                }
            }}
        >
            <div
                className="w-full max-w-[400px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <h2 className="text-sm font-semibold text-slate-900">
                        Thêm học sinh
                    </h2>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isProcessing}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleCheck}>
                    <div className="px-3 py-4">
                        {/* Search */}
                        <div>
                            <label
                                htmlFor="studentCode"
                                className="mb-1.5 block text-[11px] font-medium text-slate-700"
                            >
                                Mã học sinh
                            </label>

                            <div className="flex gap-2">
                                <div className="relative min-w-0 flex-1">
                                    <Search
                                        size={14}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="studentCode"
                                        type="text"
                                        value={studentCode}
                                        onChange={(e) => {
                                            setStudentCode(
                                                e.target.value
                                            );

                                            if (checkResult) {
                                                setCheckResult(null);
                                                setExpiresAt("");
                                            }
                                        }}
                                        placeholder="Nhập mã học sinh"
                                        autoFocus
                                        disabled={isProcessing}
                                        className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-50"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={
                                        isProcessing ||
                                        !studentCode.trim()
                                    }
                                    className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Search size={14} />

                                    {checking
                                        ? "Đang tìm..."
                                        : "Tìm"}
                                </button>
                            </div>
                        </div>

                        {/* Result */}
                        {checkResult && (
                            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                                {/* Student */}
                                <div className="flex items-center gap-3 px-3 py-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                                        {student?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "?"}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-[13px] font-semibold text-slate-900">
                                            {student?.name || "--"}
                                        </p>

                                        <p className="mt-0.5 truncate text-[11px] text-slate-500">
                                            {student?.studentCode}

                                            {student?.email
                                                ? ` · ${student.email}`
                                                : ""}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                {statusConfig && (
                                    <div
                                        className={`border-t px-3 py-2.5 ${statusConfig.className}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-semibold">
                                                {statusConfig.label}
                                            </span>

                                            {enrollment?.expiresAt &&
                                                status !==
                                                "NOT_ENROLLED" && (
                                                    <span className="text-[10px]">
                                                        Hết hạn:{" "}
                                                        {formatDate(
                                                            enrollment.expiresAt
                                                        )}
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                )}

                                {/* Enrollment duration */}
                                {canAdd && (
                                    <div className="border-t border-slate-100 px-3 py-3">
                                        {/* Duration */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-medium text-slate-700">
                                                Thời gian
                                            </span>

                                            <span className="text-[11px] font-semibold text-slate-900">
                                                {prediction?.durationMonths
                                                    ? `${prediction.durationMonths} tháng`
                                                    : "--"}
                                            </span>
                                        </div>

                                        {/* Dates */}
                                        <div className="mt-3 pt-3 flex justify-between gap-2 border-t border-slate-100">
                                            {/* Start date */}
                                            <div>
                                                <label
                                                    htmlFor="startDate"
                                                    className="mb-1.5 block text-[10px] font-medium text-slate-500"
                                                >
                                                    Bắt đầu
                                                </label>

                                                <input
                                                    id="startDate"
                                                    type="date"
                                                    value={
                                                        prediction?.startDate
                                                            ? toInputDate(
                                                                prediction.startDate
                                                            )
                                                            : toInputDate(
                                                                new Date()
                                                            )
                                                    }
                                                    disabled
                                                    className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-[11px] text-slate-600 outline-none disabled:cursor-default"
                                                />
                                            </div>

                                            {/* Arrow */}
                                            <div className="pt-6.5 text-slate-300">
                                                →
                                            </div>

                                            {/* End date */}
                                            <div>
                                                <label
                                                    htmlFor="expiresAt"
                                                    className="mb-1.5 block text-[10px] font-medium text-slate-500"
                                                >
                                                    Hết hạn
                                                </label>

                                                <div className="relative">
                                                    <CalendarDays
                                                        size={13}
                                                        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                                                    />

                                                    <input
                                                        id="expiresAt"
                                                        type="date"
                                                        value={expiresAt}
                                                        min={toInputDate(
                                                            new Date()
                                                        )}
                                                        onChange={(e) =>
                                                            setExpiresAt(
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            isProcessing
                                                        }
                                                        className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-2 text-[11px] text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {prediction?.nextExpiresAt && (
                                            <p className="mt-1.5 text-right text-[10px] text-slate-400">
                                                Ngày hết hạn được hệ thống đề xuất
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isProcessing}
                            className="h-8 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Hủy
                        </button>

                        {canAdd && (
                            <button
                                type="button"
                                onClick={handleAdd}
                                disabled={
                                    isProcessing || !expiresAt
                                }
                                className="h-8 rounded-lg bg-blue-600 px-3 text-[11px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {adding
                                    ? "Đang thêm..."
                                    : "Thêm học sinh"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;