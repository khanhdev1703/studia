const formatDuration = (seconds) => {
    if (seconds == null || seconds <= 0) {
        return "0 giây";
    }

    if (seconds < 60) {
        return `${seconds} giây`;
    }

    const minutes = Math.ceil(seconds / 60);

    return `${minutes} phút`;
};

export default formatDuration;