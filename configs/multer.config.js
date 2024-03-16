const multer = require("multer");
const date = Date.now();

/** Multer Configuration
 * Ensures that file uploads are properly handled.
 * Middleware for handling `multipart/form-data`, which is primarily used for uploading files.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${date}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
