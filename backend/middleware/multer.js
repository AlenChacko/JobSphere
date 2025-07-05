import multer from "multer";

const storage = multer.diskStorage({}); // still fine

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf", // ✅ allow resumes
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

export const upload = multer({ storage, fileFilter });
