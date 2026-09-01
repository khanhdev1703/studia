import {
    House,
    BookOpen,
    Compass,
    UserRound,
} from "lucide-react";

const studentMenuItems = [
    // {
    //     label: "Trang chủ",
    //     path: "/student",
    //     icon: House,
    //     end: true,
    //     isShowMenu: true,
    // },
    {
        label: "Học tập",
        path: "/student/courses",
        icon: BookOpen,
        end: false,
        isShowMenu: true,
    },
    {
        label: "Khám phá",
        path: "/student/explore",
        icon: Compass,
        end: false,
        isShowMenu: true,
    },
    {
        label: "Hồ sơ",
        path: "/student/profile",
        icon: UserRound,
        end: false,
        isShowMenu: true,
    },
];

export default studentMenuItems;