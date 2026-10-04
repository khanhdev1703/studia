import {
    BookOpen,
    Compass,
    UserRound,
} from "lucide-react";

const studentMenuItems = [
    {
        label: "Học tập",
        path: "/student/courses",
        icon: BookOpen,
        end: false,
    },
    {
        label: "Khám phá",
        path: "/student/explore",
        icon: Compass,
        end: false,
    },
    {
        label: "Hồ sơ",
        path: "/student/profile",
        icon: UserRound,
        end: true,
    },
];

export default studentMenuItems;