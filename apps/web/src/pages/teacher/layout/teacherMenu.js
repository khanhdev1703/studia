import {
    LayoutDashboard,
    BookOpen,
    Bell,
} from "lucide-react";

import ProfileIcon from "../../../components/common/ProfileIcon";

const teacherMenuItems = [
    // {
    //     label: "Tổng quan",
    //     path: "/teacher",
    //     icon: LayoutDashboard,
    //     end: true,
    //     isShowMenu: true,
    // },
    {
        label: "Khóa học",
        path: "/teacher/courses",
        icon: BookOpen,
        isShowMenu: true,
    },
    {
        label: "Thông báo",
        path: "/teacher/notifications",
        icon: Bell,
        isShowMenu: true,
    },
    {
        label: "Hồ sơ",
        path: "/teacher/profile",
        icon: ProfileIcon,
        isShowMenu: true,
    },
];

export default teacherMenuItems;