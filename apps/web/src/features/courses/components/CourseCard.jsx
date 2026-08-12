import { Clock3 } from 'lucide-react';

function CourseCard({ course }) {
  return (
    <article className="overflow-hidden rounded-[20px] bg-white">
      {/* Thumbnail */}
      <div className="aspect-[16/9] overflow-hidden bg-[#EEEEF0]">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#A0A0A0]">
            Chưa có ảnh
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-[17px] leading-6 text-[#222222]">
          {course.title}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-[#888888]">
          <span className="truncate">
            {course.teacher}
          </span>

          {course.duration && (
            <span className="flex shrink-0 items-center gap-1">
              <Clock3 size={13} strokeWidth={1.7} />
              {course.duration}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default CourseCard;