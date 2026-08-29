// src/utils/getUrl.js

const getUrl = (url) => {
    if (!url) {
        return "";
    }

    // Ảnh vừa chọn từ máy
    if (url.startsWith("blob:")) {
        return url;
    }

    // BE/Cloud đã trả URL đầy đủ
    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }

    // URL tương đối từ BE
    return `${import.meta.env.VITE_API_URL}${url}`;
};

export default getUrl;