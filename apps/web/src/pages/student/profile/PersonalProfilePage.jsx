import { useEffect, useMemo, useState } from "react";
import { Camera, Check, ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";
import userService from "../../../services/userService";
import { ANIMAL_AVATARS } from "../../../constants/avatars";

const DEFAULT_AVATAR = ANIMAL_AVATARS[0]?.url || "";

const getRoleLabel = (role) => {
    switch (role) {
        case "STUDENT":
            return "Học viên";
        case "TEACHER":
            return "Giáo viên";
        case "ADMIN":
            return "Quản trị viên";
        default:
            return role || "-";
    }
};

const PersonalProfilePage = () => {
    const navigate = useNavigate();

    const { user, setUser } = useAuthStore();

    const [name, setName] = useState("");
    const [selectedAvatar, setSelectedAvatar] =
        useState(DEFAULT_AVATAR);

    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    /**
     * Đồng bộ dữ liệu từ authStore
     */
    useEffect(() => {
        setName(user?.name || "");
        setSelectedAvatar(user?.avatar || DEFAULT_AVATAR);
    }, [user?.name, user?.avatar]);

    useEffect(() => {
        if (isAvatarModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAvatarModalOpen]);

    /**
     * Avatar hiện tại
     * selectedAvatar là URL string
     */
    const currentAvatar = useMemo(() => {
        return selectedAvatar || DEFAULT_AVATAR;
    }, [selectedAvatar]);

    /**
     * Kiểm tra dữ liệu có thay đổi không
     */
    const hasChanges =
        name.trim() !== (user?.name || "") ||
        selectedAvatar !== (user?.avatar || DEFAULT_AVATAR);

    /**
     * Lưu thông tin
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newName = name.trim();

        if (!newName) {
            return;
        }

        if (!hasChanges) {
            return;
        }

        setIsSaving(true);
        setIsSaved(false);

        try {
            const response = await userService.updateMe({
                name: newName,
                avatar: selectedAvatar,
            });

            const updatedUser = response?.data;

            setUser({
                ...user,
                ...updatedUser,
                name: newName,
                avatar: selectedAvatar,
            });

            setIsSaved(true);

            setTimeout(() => {
                setIsSaved(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to update profile:",
                error
            );
        } finally {
            setIsSaving(false);
        }
    };

    /**
     * Quay lại
     */
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-full bg-[#FAFAFA] text-[#18181B]">
            {/* ==================== HEADER ==================== */}
            <header className="border-b border-[#E4E4E7] bg-white">
                <div className="mx-auto flex h-14 max-w-[720px] items-center px-4 sm:px-6">
                    {/* Back */}
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71717A] transition hover:bg-[#F4F4F5] hover:text-[#18181B]"
                        aria-label="Quay lại"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Title */}
                    <h1 className="flex-1 text-center text-[15px] font-semibold text-[#18181B]">
                        Hồ sơ
                    </h1>

                    {/* Spacer để title nằm chính giữa */}
                    <div className="h-8 w-8" />
                </div>
            </header>

            {/* ==================== CONTENT ==================== */}
            <main className="mx-auto max-w-[720px] p-3 sm:px-6">
                <div className="space-y-4">
                    {/* ==================== AVATAR ==================== */}
                    <section className="rounded-2xl border border-[#E4E4E7] bg-white p-5">
                        <div className="flex flex-col items-center">
                            {/* Avatar */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsAvatarModalOpen(true)
                                    }
                                    className="group relative h-24 w-24 overflow-hidden rounded-full bg-[#EFF6FF] ring-4 ring-white shadow-sm"
                                    aria-label="Thay đổi avatar"
                                >
                                    <img
                                        src={currentAvatar}
                                        alt="Avatar"
                                        className="h-full w-full object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                                        <span className="rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                                            Đổi
                                        </span>
                                    </div>
                                </button>

                                {/* Camera button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsAvatarModalOpen(true)
                                    }
                                    className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#18181B] text-white shadow-sm transition hover:bg-[#27272A]"
                                    aria-label="Chọn avatar"
                                >
                                    <Camera
                                        size={13}
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>

                            {/* Name */}
                            <div className="mt-3 text-center">
                                <p className="mt-1 text-[12px] text-[#71717A]">
                                    {getRoleLabel(user?.role)}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ==================== PERSONAL INFO ==================== */}
                    <section className="rounded-2xl border border-[#E4E4E7] bg-white">
                        <form onSubmit={handleSubmit}>
                            {/* Section header */}
                            <div className="border-b border-[#E4E4E7] px-5 py-4">
                                <h2 className="text-[13px] font-semibold text-[#18181B]">
                                    Thông tin cá nhân
                                </h2>

                                <p className="mt-1 text-[11px] text-[#71717A]">
                                    Cập nhật thông tin cá nhân của bạn.
                                </p>
                            </div>

                            {/* Fields */}
                            <div className="space-y-4 px-5 py-5">
                                {/* ==================== NAME ==================== */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-1.5 block text-[11px] font-medium text-[#3F3F46]"
                                    >
                                        Họ và tên
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Nhập họ và tên"
                                        className="h-10 w-full rounded-lg border border-[#E4E4E7] bg-white px-3 text-[12px] text-[#18181B] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                                    />
                                </div>

                                {/* ==================== EMAIL ==================== */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-[11px] font-medium text-[#3F3F46]"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="h-10 w-full cursor-not-allowed rounded-lg border border-[#E4E4E7] bg-[#F4F4F5] px-3 text-[12px] text-[#71717A] outline-none"
                                    />
                                </div>

                                {/* ==================== STUDENT CODE ==================== */}
                                {user?.role === "STUDENT" && (
                                    <div>
                                        <label
                                            htmlFor="studentCode"
                                            className="mb-1.5 block text-[11px] font-medium text-[#3F3F46]"
                                        >
                                            Mã học viên
                                        </label>

                                        <input
                                            id="studentCode"
                                            type="text"
                                            value={
                                                user?.studentCode || ""
                                            }
                                            disabled
                                            className="h-10 w-full cursor-not-allowed rounded-lg border border-[#E4E4E7] bg-[#F4F4F5] px-3 text-[12px] text-[#71717A] outline-none"
                                        />
                                    </div>
                                )}

                                {/* ==================== SAVE ==================== */}
                                <div className="flex items-center justify-between border-t border-[#E4E4E7] pt-4">
                                    {/* Saved message */}
                                    <div>
                                        {isSaved && (
                                            <div className="flex items-center gap-1.5 text-[11px] text-green-600">
                                                <Check size={14} />

                                                <span>
                                                    Đã lưu thay đổi
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Save button */}
                                    <button
                                        type="submit"
                                        disabled={
                                            isSaving ||
                                            !name.trim() ||
                                            !hasChanges
                                        }
                                        className="inline-flex h-9 items-center justify-center rounded-lg bg-[#18181B] px-4 text-[11px] font-medium text-white transition hover:bg-[#27272A] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {isSaving
                                            ? "Đang lưu..."
                                            : "Lưu thay đổi"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </main>

            <div
                className={`fixed inset-0 z-50 flex items-end justify-center bg-black/40 transition-opacity duration-200 sm:items-center sm:p-4 ${isAvatarModalOpen
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0"
                    }`}
            >
                <div
                    className={`flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl transition-transform duration-200 sm:max-w-[520px] sm:rounded-2xl ${isAvatarModalOpen
                        ? "translate-y-0"
                        : "translate-y-4 sm:translate-y-2"
                        }`}
                >
                    {/* Header */}
                    <div className="flex shrink-0 items-center justify-between border-b border-[#E4E4E7] px-5 py-4">
                        <div>
                            <h2 className="text-[14px] font-semibold text-[#18181B]">
                                Chọn avatar
                            </h2>

                            <p className="mt-0.5 text-[11px] text-[#71717A]">
                                Chọn hình đại diện cho hồ sơ của bạn.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsAvatarModalOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71717A] transition hover:bg-[#F4F4F5] hover:text-[#18181B]"
                        >
                            <X size={17} />
                        </button>
                    </div>

                    {/* CHỈ PHẦN NÀY ĐƯỢC SCROLL */}
                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                        <div className="grid grid-cols-4 gap-x-4 gap-y-5 sm:grid-cols-5">
                            {ANIMAL_AVATARS.map((avatar) => {
                                const isSelected =
                                    selectedAvatar === avatar.url;

                                return (
                                    <button
                                        key={avatar.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedAvatar(avatar.url)
                                        }
                                        className="group flex min-w-0 flex-col items-center gap-2"
                                    >
                                        <div className="relative h-16 w-16 shrink-0">
                                            <div
                                                className={`h-16 w-16 overflow-hidden rounded-full bg-[#F4F4F5] ${isSelected
                                                    ? "ring-2 ring-[#2563EB] ring-offset-2"
                                                    : "ring-1 ring-[#E4E4E7]"
                                                    }`}
                                            >
                                                <img
                                                    src={avatar.url}
                                                    alt={avatar.name}
                                                    loading="lazy"
                                                    decoding="async"
                                                    width={128}
                                                    height={128}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            {isSelected && (
                                                <span className="absolute -bottom-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#2563EB] text-white shadow-sm">
                                                    <Check
                                                        size={11}
                                                        strokeWidth={3}
                                                    />
                                                </span>
                                            )}
                                        </div>

                                        <span className="w-full truncate px-1 text-center text-[10px] text-[#52525B]">
                                            {avatar.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex shrink-0 justify-end border-t border-[#E4E4E7] bg-white px-5 py-4">
                        <button
                            type="button"
                            onClick={() => setIsAvatarModalOpen(false)}
                            className="h-9 rounded-lg bg-[#18181B] px-4 text-[11px] font-medium text-white transition hover:bg-[#27272A]"
                        >
                            Chọn avatar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalProfilePage;