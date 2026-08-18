import useAuthStore from "../../stores/authStore";

const TeacherAccountMenu = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div>
            <div className="flex items-center justify-center rounded-full text-sm font-semibold text-[#6C5CE7]">
                {user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "T"}
            </div>
        </div>
    );
};

export default TeacherAccountMenu;