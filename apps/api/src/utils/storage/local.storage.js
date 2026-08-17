import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const upload = async (
    file,
    folder = "courses"
) => {
    if (!file) {
        throw new Error(
            "Không có file để upload."
        );
    }

    const uploadDir = path.join(
        process.cwd(),
        "uploads",
        folder
    );

    await fs.mkdir(uploadDir, {
        recursive: true,
    });

    const extension =
        path.extname(
            file.originalname
        ) || ".jpg";

    const filename =
        `${crypto.randomUUID()}${extension}`;

    const filePath = path.join(
        uploadDir,
        filename
    );

    // ==========================================
    // File từ memoryStorage
    // ==========================================

    if (file.buffer) {
        await fs.writeFile(
            filePath,
            file.buffer
        );
    }

    // ==========================================
    // File từ diskStorage
    // ==========================================

    else if (file.path) {
        await fs.rename(
            file.path,
            filePath
        );
    }

    // ==========================================
    // Invalid file
    // ==========================================

    else {
        throw new Error(
            "File không có buffer hoặc path."
        );
    }

    return {
        filename,

        path: filePath,

        url: `/uploads/${folder}/${filename}`,
    };
};

const remove = async (url) => {
    if (!url) {
        return;
    }

    const relativePath =
        url.replace(/^\/+/, "");

    const filePath = path.join(
        process.cwd(),
        relativePath
    );

    try {
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }
};

export default {
    upload,
    remove,
};