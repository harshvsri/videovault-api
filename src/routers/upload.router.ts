import fs from "fs";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import { upload, removeVideo } from "../configs/multer.config";
import { getFfmpegCmd } from "../configs/ffmpeg.config";
import { prisma } from "../prisma";
import { validateUpload, validateUploadPUT } from "../utils/validation";
import { ClientCertificateCredential } from "@azure/identity";

const uploadRouter = Router();

uploadRouter.post(
  "/",
  upload.single("file"),
  validateUpload,
  async (req, res) => {
    const videoPath = req.file.path;

    const videoID = uuidv4();
    const outputPath = `./uploads/${videoID}`;
    // Ensure the output directory exists
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const hlsPath = `${outputPath}/index.m3u8`;

    exec(
      getFfmpegCmd(videoPath, outputPath, hlsPath),
      async (err, stdout, stderr) => {
        if (err) {
          console.error(`Ffmpeg err: ${err}`);
          console.error(stderr);

          removeVideo(videoPath);
          return res.status(500).json({ error: "Failed to process video" });
        }
        console.log(stdout);
        removeVideo(videoPath);
        const videoURL = `http://localhost:3000/uploads/${videoID}/index.m3u8`;

        try {
          const upload = await prisma.upload.create({
            data: {
              ...req.body,
              videoURL,
              userID: req.user.id,
            },
          });
          res
            .status(200)
            .json({ message: "Video processed successfully", upload });
        } catch (err) {
          res.status(500).json({ message: "Error uploading video" });
        }
      }
    );
  }
);

uploadRouter.put("/:id", validateUploadPUT, async (req, res) => {
  const uploadID = Number(req.params.id);

  const { uploads } = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      uploads: true,
    },
  });
  const uploadFound = uploads.find((upload) => upload.id === uploadID);
  if (!uploadFound) {
    res.status(400).json({ message: "No such upload found" });
    return;
  }

  const upload = await prisma.upload.update({
    where: {
      id: uploadID,
    },
    data: req.body,
  });
  res.status(200).json({ message: "Upload updated successfully", upload });
});

uploadRouter.delete("/:id", async (req, res) => {
  const uploadID = Number(req.params.id);

  const { uploads } = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      uploads: true,
    },
  });

  const uploadFound = uploads.find((upload) => upload.id === uploadID);
  if (!uploadFound) {
    res.status(400).json({ message: "No such upload found" });
    return;
  }

  const upload = await prisma.upload.delete({
    where: {
      id: uploadID,
    },
  });
  res.status(200).json({ message: "Upload deleted successfully", upload });
});

export default uploadRouter;
