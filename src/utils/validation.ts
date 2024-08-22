import { body, validationResult } from "express-validator";
import { prisma } from "../prisma";

export const validateCredential = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("email").optional().isEmail(),
  body("fullName").optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Missing Credentials", errors: errors.array() });
    }
    next();
  },
];

export const uniqueUsername = async (req, res, next) => {
  const { username } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user) {
    return res.status(409).json({ message: "Username not available" });
  }
  next();
};

export const validateUpload = [
  body("title").exists().isString(),
  body("description").isString().optional(),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Missing upload details", errors: errors.array() });
    }
    next();
  },
];

export const validateUploadPUT = [
  body("title").optional().isString(),
  body("description").optional().isString(),
  body("thumbnailURL").optional().isString(),
  body("likes").optional().isNumeric(),
  (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: "No upload details" });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Missing upload details", errors: errors.array() });
    }
    next();
  },
];
