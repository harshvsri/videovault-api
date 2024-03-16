const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");

async function uploadThumbnail(thumbnailFilePath) {
  try {
    const AZURE_STORAGE_CONNECTION_STRING =
      process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = process.env.AZURE_STORAGE_THUMBNAIL_CONTAINER_NAME;

    // Create the BlobServiceClient object with connection string
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Define the name for the video blob
    const blobName = path.basename(thumbnailFilePath);

    // Upload thumbnail to Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const thumbnailStream = fs.createReadStream(thumbnailFilePath);

    await blockBlobClient.uploadStream(
      thumbnailStream,
      thumbnailStream.byteLength
    );
    console.log(`Thumbnail "${blobName}" uploaded successfully.`);

    const thumbnailURL = blobServiceClient.url + containerName + "/" + blobName;
    console.log(thumbnailURL);
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}

module.exports = uploadThumbnail;
