const { BlobServiceClient } = require("@azure/storage-blob");

async function downloadThumbnail(blobName) {
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

    // Get a reference to the video blob
    const blobClient = containerClient.getBlobClient(blobName);

    // Download video from Azure Blob Storage
    const downloadBlockBlobResponse = await blobClient.download();
    return downloadBlockBlobResponse.readableStreamBody;
  } catch (error) {
    console.error("Error downloading video:", error);
  }
}

module.exports = downloadThumbnail;
