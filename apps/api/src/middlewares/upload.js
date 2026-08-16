import multer from "multer";

const upload = multer({

    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        console.log("Upload BE");
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

export default upload;