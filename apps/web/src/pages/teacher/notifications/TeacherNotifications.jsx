import { useEffect, useState } from "react";

import { Bell } from "lucide-react";

import Loading from "../../../components/common/Loading";
import NotificationItem from "./components/NotificationItem";
import appToast from "../../../utils/toast";
import enrollmentService from "../../../services/enrollmentService";

const TeacherNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // Fetch notifications
    // ==========================================

    const fetchNotifications = async () => {
        try {
            setLoading(true);

            const response =
                await enrollmentService.getTeacherPendingRequests();

            setNotifications(response?.data || []);
        } catch (error) {
            console.error(
                "Get teacher notifications error:",
                error
            );

            appToast.error(
                error?.response?.data?.message ||
                "Không thể tải thông báo."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Initial fetch
    // ==========================================

    useEffect(() => {
        fetchNotifications();
    }, []);

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return <Loading />;
    }

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="space-y-3">
            {/* ==================================
                Header
            ================================== */}

            <div className="border border-gray-100 bg-white p-4">
                <div className="flex items-center gap-2">
                    <Bell
                        size={18}
                        className="text-[#6C5CE7]"
                    />

                    <h1 className="text-base font-semibold text-[#252238]">
                        Thông báo
                    </h1>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                    Các thông báo và yêu cầu cần bạn
                    xử lý.
                </p>
            </div>

            {/* ==================================
                Empty
            ================================== */}

            {notifications.length === 0 ? (
                <div className="border border-gray-100 bg-white px-4 py-12 text-center">
                    <div
                        className="
                            mx-auto
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-50
                            text-gray-400
                        "
                    >
                        <Bell size={21} />
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-600">
                        Không có thông báo mới
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Hiện tại bạn không có thông báo
                        nào cần xử lý.
                    </p>
                </div>
            ) : (
                /* ==================================
                    Notification list
                ================================== */

                <div className="space-y-2">
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onProcessed={(id) => {
                                setNotifications((prev) =>
                                    prev.filter(
                                        (item) => item.id !== id
                                    )
                                );
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeacherNotifications;