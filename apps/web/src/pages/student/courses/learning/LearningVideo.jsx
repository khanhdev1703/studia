// src/pages/student/courses/learning/LearningVideo.jsx

import { useRef, useState } from "react";

import {
  CirclePlay,
} from "lucide-react";
import getUrl from "../../../../utils/getUrl";


const LearningVideo = ({ lesson, onComplete }) => {
  const videoRef = useRef(null);

  const [completing, setCompleting] = useState(false);

  if (!lesson) {
    return (
      <section className="flex aspect-video w-full items-center justify-center rounded-lg border border-[#E4E1F2] bg-white shadow-sm">
        <div className="text-center">
          <CirclePlay
            size={36}
            strokeWidth={1.5}
            className="mx-auto mb-3 text-gray-300"
          />

          <p className="text-sm font-medium text-gray-500">
            Chưa có bài học để hiển thị.
          </p>
        </div>
      </section>
    );
  }

  const isCompleted = lesson.isCompleted;

  const handleVideoEnded = async () => {
    if (isCompleted || completing) {
      return;
    }

    try {
      setCompleting(true);

      await onComplete?.(lesson.id);
    } catch (error) {
      console.error(
        "Complete lesson error:",
        error
      );
    } finally {
      setCompleting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-lg border border-[#E4E1F2] bg-white shadow-sm">
      {/* Video */}
      <div className="relative aspect-video bg-[#171522]">
        {lesson.video ? (
          <video
            ref={videoRef}
            key={lesson.id}
            src={getUrl(lesson.video)}
            controls
            playsInline
            onEnded={handleVideoEnded}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-white/60">
              <CirclePlay
                size={38}
                strokeWidth={1.5}
                className="mx-auto mb-2"
              />

              <p className="text-sm">
                Bài học chưa có video.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningVideo;