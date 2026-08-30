// src/pages/student/courses/components/learning/LearningHeader.jsx

import { ArrowLeft, BookOpen } from "lucide-react";

const LearningHeader = ({
  courseTitle,
  lessonCount,
  onBack,
  onOpenLessons,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-3 sm:px-5">
        {/* Back */}

        <button
          type="button"
          onClick={onBack}
          className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        text-gray-500
                        transition
                        hover:bg-gray-100
                        hover:text-gray-700
                    "
          aria-label="Quay lại"
        >
          <ArrowLeft size={19} />
        </button>

        {/* Course title */}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#252238]">
            {courseTitle}
          </p>
        </div>

        {/* Lesson drawer */}

        <button
          type="button"
          onClick={onOpenLessons}
          className="
                        flex
                        h-9
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-md
                        border
                        border-[#DED9FF]
                        bg-[#F5F3FF]
                        px-2.5
                        text-xs
                        font-medium
                        text-[#6C5CE7]
                        transition
                        hover:bg-[#ECE9FF]
                    "
          aria-label="Danh sách bài học"
        >
          <BookOpen size={16} />

          <span className="hidden sm:inline">
            Bài học
          </span>

          <span className="text-[10px] text-[#8A80D9]">
            {lessonCount}
          </span>
        </button>
      </div>
    </header>
  );
};

export default LearningHeader;