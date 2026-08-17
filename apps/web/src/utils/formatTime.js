const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) {
        return null;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes < 60) {
        return `${minutes}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}:${String(
        remainingMinutes
    ).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
};

export default formatTime;