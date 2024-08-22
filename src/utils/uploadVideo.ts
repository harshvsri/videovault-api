import { BlobServiceClient } from "@azure/storage-blob";
import fs from "fs";
import path from "path";

async function uploadVideo(videoFilePath) {
  try {
    const AZURE_STORAGE_CONNECTION_STRING =
      process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = process.env.AZURE_STORAGE_VIDEO_CONTAINER_NAME;

    // Create the BlobServiceClient object with connection string
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Define the name for the video blob
    const blobName = path.basename(videoFilePath);

    // Upload video to Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const videoStream = fs.createReadStream(videoFilePath);

    await blockBlobClient.uploadStream(videoStream);
    console.log(`Video "${blobName}" uploaded successfully.`);
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}

module.exports = uploadVideo;
