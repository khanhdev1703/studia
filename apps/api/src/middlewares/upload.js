import multer from "multer";
import path from "path";
import fs from "fs";

// ==========================================
// Upload directories
// ==========================================

const uploadDir = path.resolve(
    "tmp/uploads"
);

// Tạo thư mục nếu chưa tồn tại
fs.mkdirSync(uploadDir, {
    recursive: true,
});

// ==========================================
// Storage
// ==========================================

const imageStorage = multer.memoryStorage();

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "tmp/uploads");
    },

    filename: (req, file, cb) => {
        console.log("select video storage");

        const ext = path.extname(
            file.originalname
        );

        const filename =
            `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}${ext}`;

        cb(null, filename);
    },
});
const documentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "tmp/uploads");
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const filename = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${ext}`;

        cb(null, filename);
    },
});

// ==========================================
// Image upload
// ==========================================

const imageUpload = multer({
    storage: imageStorage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP."
                )
            );
        }

        cb(null, true);
    },
});

// ==========================================
// Video upload
// ==========================================

const videoUpload = multer({
    storage: videoStorage,

    limits: {
        fileSize: 500 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "video/mp4",
            "video/webm",
            "video/quicktime",
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Chỉ hỗ trợ video MP4, WebM hoặc MOV."
                )
            );
        }

        cb(null, true);
    },
});

// ==========================================
// Document upload
// ==========================================

const documentUpload = multer({
    storage: documentStorage,
    limits: {
        fileSize: 20 * 1024 * 1024,
        files: 10,
    },
    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "application/pdf",

            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",

            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Chỉ hỗ trợ file PDF, Word, PowerPoint hoặc Excel."
                )
            );
        }

        cb(null, true);
    },
});

export {
    imageUpload,
    videoUpload,
    documentUpload,
};