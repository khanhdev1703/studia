import {
    LayoutDashboard,
    BookOpen,
    Users,
    UserRound,
} from "lucide-react";

const teacherMenuItems = [
    {
        label: "Tổng quan",
        path: "/teacher",
        icon: LayoutDashboard,
        end: true,
        isShowMenu: true,
    },
    {
        label: "Khóa học",
        path: "/teacher/courses",
        icon: BookOpen,
        isShowMenu: true,
    },
    {
        label: "Học viên",
        path: "/teacher/students",
        icon: Users,
        isShowMenu: true,
    },
    {
        label: "Hồ sơ",
        path: "/teacher/profile",
        icon: UserRound,
        isShowMenu: false,
    },
];

export default teacherMenuItems;