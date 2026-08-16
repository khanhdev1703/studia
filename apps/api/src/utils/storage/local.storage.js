import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const upload = async (
    file,
    folder = "courses"
) => {
    const uploadDir = path.join(
        process.cwd(),
        "uploads",
        folder
    );

    await fs.mkdir(uploadDir, {
        recursive: true,
    });

    const extension =
        path.extname(file.originalname) || ".jpg";

    const filename =
        `${crypto.randomUUID()}${extension}`;

    const filePath = path.join(
        uploadDir,
        filename
    );

    await fs.writeFile(
        filePath,
        file.buffer
    );

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