// src/components/common/Video.jsx

import { useEffect, useRef, useState } from "react";

import {
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

import getUrl from "../../utils/getUrl";

const Video = ({
  src,
  poster,
  className = "",
  onPlay,
  onPause,
  onEnded,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  const [isMuted, setIsMuted] = useState(false);

  const [showControls, setShowControls] =
    useState(true);

  /*
   * =========================
   * Controls timeout
   * =========================
   */

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(
        controlsTimeoutRef.current
      );

      controlsTimeoutRef.current = null;
    }
  };

  const hideControlsAfterDelay = (
    delay = 2500
  ) => {
    clearControlsTimeout();

    controlsTimeoutRef.current =
      setTimeout(() => {
        setShowControls(false);
      }, delay);
  };

  /*
   * =========================
   * Cleanup
   * =========================
   */

  useEffect(() => {
    return () => {
      clearControlsTimeout();
    };
  }, []);

  /*
   * =========================
   * Reset when src changes
   * =========================
   */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    video.currentTime = 0;

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setShowControls(true);

    clearControlsTimeout();
  }, [src]);

  /*
   * =========================
   * Video metadata
   * =========================
   */

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(
      Number.isFinite(video.duration)
        ? video.duration
        : 0
    );
  };

  /*
   * =========================
   * Time update
   * =========================
   */

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setCurrentTime(video.currentTime);
  };

  /*
   * =========================
   * Play
   * =========================
   */

  const handlePlay = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    try {
      await video.play();

      setIsPlaying(true);
      setShowControls(true);

      clearControlsTimeout();

      hideControlsAfterDelay(2500);

      onPlay?.();
    } catch (error) {
      console.error(
        "Video play error:",
        error
      );
    }
  };

  /*
   * =========================
   * Pause
   * =========================
   */

  const handlePause = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    setIsPlaying(false);
    setShowControls(true);

    clearControlsTimeout();

    onPause?.();
  };

  /*
   * =========================
   * Play / Pause
   * =========================
   */

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
      return;
    }

    handlePlay();
  };

  /*
   * =========================
   * Seek
   * =========================
   */

  const handleSeek = (event) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextTime = Number(
      event.target.value
    );

    video.currentTime = nextTime;

    setCurrentTime(nextTime);

    setShowControls(true);

    if (isPlaying) {
      hideControlsAfterDelay(2500);
    }
  };

  /*
   * =========================
   * Volume
   * =========================
   */

  const handleVolumeChange = (event) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextVolume = Number(
      event.target.value
    );

    video.volume = nextVolume;

    setVolume(nextVolume);

    if (nextVolume === 0) {
      video.muted = true;
      setIsMuted(true);
    } else {
      video.muted = false;
      setIsMuted(false);
    }

    setShowControls(true);

    if (isPlaying) {
      hideControlsAfterDelay(2500);
    }
  };

  /*
   * =========================
   * Mute
   * =========================
   */

  const handleToggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.muted) {
      const nextVolume =
        volume > 0 ? volume : 1;

      video.muted = false;
      video.volume = nextVolume;

      setVolume(nextVolume);
      setIsMuted(false);
    } else {
      video.muted = true;

      setIsMuted(true);
    }

    setShowControls(true);

    if (isPlaying) {
      hideControlsAfterDelay(2500);
    }
  };

  /*
   * =========================
   * Fullscreen
   * =========================
   */

  const handleFullscreen = async () => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch (error) {
      console.error(
        "Fullscreen error:",
        error
      );
    }

    setShowControls(true);

    if (isPlaying) {
      hideControlsAfterDelay(2500);
    }
  };

  /*
   * =========================
   * Video ended
   * =========================
   */

  const handleVideoEnded = () => {
    setIsPlaying(false);

    setCurrentTime(duration);

    setShowControls(true);

    clearControlsTimeout();

    onEnded?.();
  };

  /*
   * =========================
   * Mouse / touch interaction
   * =========================
   */

  const handleUserInteraction = () => {
    setShowControls(true);

    clearControlsTimeout();

    if (isPlaying) {
      hideControlsAfterDelay(2500);
    }
  };

  const handleMouseLeave = () => {
    if (!isPlaying) {
      return;
    }

    clearControlsTimeout();

    hideControlsAfterDelay(1000);
  };

  /*
   * =========================
   * Format time
   * =========================
   */

  const formatTime = (time) => {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const totalSeconds = Math.floor(time);

    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(
        minutes
      ).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    }

    return `${minutes}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  /*
   * =========================
   * No video
   * =========================
   */

  if (!src) {
    return (
      <div
        className={`
                    flex
                    aspect-video
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[#211E3A]
                    ${className}
                `}
      >
        <div
          className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        text-white
                    "
        >
          <Play
            size={22}
            fill="currentColor"
          />
        </div>
      </div>
    );
  }

  /*
   * =========================
   * Render
   * =========================
   */

  const progress =
    duration > 0
      ? Math.min(
        100,
        (currentTime / duration) * 100
      )
      : 0;

  return (
    <div
      ref={containerRef}
      className={`
                group
                relative
                aspect-video
                w-full
                overflow-hidden
                bg-black
                select-none
                ${className}
            `}
      onMouseMove={
        handleUserInteraction
      }
      onTouchStart={
        handleUserInteraction
      }
      onMouseLeave={handleMouseLeave}
    >
      {/* =========================
                Video
            ========================= */}

      <video
        ref={videoRef}
        src={getUrl(src)}
        poster={
          poster
            ? getUrl(poster)
            : undefined
        }
        playsInline
        preload="metadata"
        className="
                    h-full
                    w-full
                    bg-black
                    object-contain
                "
        onLoadedMetadata={
          handleLoadedMetadata
        }
        onTimeUpdate={
          handleTimeUpdate
        }
        onEnded={handleVideoEnded}
      />

      {/* =========================
                Center Play Button

                Chỉ hiển thị khi PAUSE
            ========================= */}

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          className="
                        absolute
                        left-1/2
                        top-1/2
                        z-10
                        flex
                        h-14
                        w-14
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-[#6C5CE7]/95
                        text-white
                        shadow-xl
                        backdrop-blur-sm
                        transition
                        duration-200
                        hover:scale-105
                        hover:bg-[#5B4BD5]
                        active:scale-95
                        sm:h-16
                        sm:w-16
                    "
          aria-label="Tiếp tục video"
        >
          <Play
            size={25}
            fill="currentColor"
            className="ml-0.5"
          />
        </button>
      )}

      {/* =========================
                Controls
            ========================= */}

      <div
        className={`
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    bg-gradient-to-t
                    from-black/85
                    via-black/45
                    to-transparent
                    px-3
                    pb-3
                    pt-10
                    transition-opacity
                    duration-200
                    sm:px-4
                    sm:pb-4
                    ${showControls
            ? "opacity-100"
            : "pointer-events-none opacity-0"
          }
                `}
      >
        {/* =========================
                    Seek bar
                ========================= */}

        <div className="relative mb-2 h-1.5 w-full">
          {/* Background */}
          <div
            className="
                            pointer-events-none
                            absolute
                            inset-0
                            overflow-hidden
                            rounded-full
                            bg-white/30
                        "
          >
            {/* Watched */}
            <div
              className="
                                h-full
                                rounded-full
                                bg-[#6C5CE7]
                                transition-[width]
                                duration-100
                            "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Seek input */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="
                            absolute
                            inset-0
                            m-0
                            h-full
                            w-full
                            cursor-pointer
                            appearance-none
                            bg-transparent

                            [&::-webkit-slider-runnable-track]:h-1.5
                            [&::-webkit-slider-runnable-track]:bg-transparent

                            [&::-moz-range-track]:h-1.5
                            [&::-moz-range-track]:bg-transparent

                            [&::-webkit-slider-thumb]:mt-[-3px]
                            [&::-webkit-slider-thumb]:h-3
                            [&::-webkit-slider-thumb]:w-3
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-[#6C5CE7]

                            [&::-moz-range-thumb]:h-3
                            [&::-moz-range-thumb]:w-3
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:border-0
                            [&::-moz-range-thumb]:bg-[#6C5CE7]
                        "
            aria-label="Tiến độ video"
          />
        </div>

        {/* =========================
                    Bottom controls
                ========================= */}

        <div className="flex items-center gap-2">
          {/* Play / Pause */}

          <button
            type="button"
            onClick={
              handlePlayPause
            }
            className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded
                            text-white
                            transition
                            hover:bg-white/10
                            active:scale-95
                        "
            aria-label={
              isPlaying
                ? "Tạm dừng"
                : "Tiếp tục"
            }
          >
            {isPlaying ? (
              <Pause
                size={18}
                fill="currentColor"
              />
            ) : (
              <Play
                size={18}
                fill="currentColor"
              />
            )}
          </button>

          {/* Mute */}

          <button
            type="button"
            onClick={
              handleToggleMute
            }
            className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded
                            text-white
                            transition
                            hover:bg-white/10
                            active:scale-95
                        "
            aria-label={
              isMuted
                ? "Bật âm thanh"
                : "Tắt âm thanh"
            }
          >
            {isMuted ||
              volume === 0 ? (
              <VolumeX size={17} />
            ) : (
              <Volume2 size={17} />
            )}
          </button>

          {/* Volume */}

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={
              isMuted
                ? 0
                : volume
            }
            onChange={
              handleVolumeChange
            }
            className="
                            hidden
                            h-1
                            w-16
                            cursor-pointer
                            appearance-none
                            rounded-full
                            bg-white/30
                            accent-[#6C5CE7]
                            sm:block
                        "
            aria-label="Âm lượng"
          />

          {/* Time */}

          <span
            className="
                            ml-1
                            text-[10px]
                            font-medium
                            tabular-nums
                            text-white/80
                            sm:text-xs
                        "
          >
            {formatTime(
              currentTime
            )}{" "}
            /{" "}
            {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Fullscreen */}

          <button
            type="button"
            onClick={
              handleFullscreen
            }
            className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded
                            text-white
                            transition
                            hover:bg-white/10
                            active:scale-95
                        "
            aria-label="Toàn màn hình"
          >
            <Maximize size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;