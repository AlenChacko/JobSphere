import multer from "multer";

const storage = multer.diskStorage({}); // No need to store on disk

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

export const upload = multer({ storage, fileFilter });

