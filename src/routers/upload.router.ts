import axios from "axios";
import { Router } from "express";
import { upload } from "../configs/multer.config";
import { prisma } from "../prisma";
import { validateUpload, validateUploadPUT } from "../utils/validation";
import {
  uploadBlob,
  removeBlob,
  deleteBlobs,
  deleteBlob,
} from "../utils/azureBlob";
const uploadRouter = Router();

uploadRouter.post(
  "/",
  upload.single("file"),
  validateUpload,
  async (req, res) => {
    const blobName = req.file.filename;
    console.log(`Uploading ${blobName}...`);
    await uploadBlob(blobName);

    console.log(`Triggering transcoder service...`);
    try {
      const status = await axios.get(
        `${process.env.TRANSCODER_URL}${blobName}`
      );
      if (status.status !== 200) {
        throw new Error("Transcoder service failed");
      }
      const videoURL = status.data.videoURL;

      const upload = await prisma.upload.create({
        data: {
          ...req.body,
          videoURL,
          userID: req.user.id,
        },
      });

      // Add the upload to the database after transcoding
      res.status(201).json({ message: "Upload successful", upload });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading video" });
    } finally {
      await deleteBlob(blobName);
      await removeBlob(`./uploads/${blobName}`);
    }
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

uploadRouter.delete("/all", async (req, res) => {
  const { masterPass } = req.body;
  if (masterPass !== process.env.MASTER_PASS) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  await deleteBlobs();
  res.status(200).json({ message: "All blobs deleted" });
});

export default uploadRouter;
