import ffmpeg from "fluent-ffmpeg";
import ffprobe from "ffprobe-static";

ffmpeg.setFfprobePath(
    ffprobe.path
);

const getVideoDuration = (filePath) => {
    return new Promise(
        (resolve, reject) => {
            ffmpeg.ffprobe(
                filePath,
                (error, metadata) => {
                    if (error) {
                        return reject(error);
                    }

                    const duration =
                        metadata?.format?.duration;

                    if (
                        typeof duration !==
                        "number"
                    ) {
                        return reject(
                            new Error(
                                "Không thể xác định độ dài video."
                            )
                        );
                    }

                    resolve(
                        Math.round(duration)
                    );
                }
            );
        }
    );
};

export default {
    getVideoDuration,
};