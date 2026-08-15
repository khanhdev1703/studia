import { BookOpen } from "lucide-react";

const EmptyCourses = () => {
    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6C5CE7]/10 text-[#6C5CE7]">
                <BookOpen size={28} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-[#252238]">
                Chưa có khóa học
            </h3>

            <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                Bạn chưa có khóa học nào. Hãy tạo khóa học đầu tiên
                để bắt đầu chia sẻ kiến thức của mình.
            </p>
        </div>
    );
};

export default EmptyCourses;