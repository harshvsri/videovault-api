import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";

/** Multer Configuration
 * Ensures that file uploads are properly handled.
 * Middleware for handling `multipart/form-data`, which is primarily used for uploading files.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });

export const removeVideo = async (videoPath) => {
  await fs.unlink(videoPath);
};
