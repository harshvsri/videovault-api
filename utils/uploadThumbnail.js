const {
  BlobServiceClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
  BlobSASPermissions,
} = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");

async function uploadThumbnail(thumbnailFilePath) {
  try {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
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

    // Generate SAS URL for the uploaded thumbnail
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey
    );

    const startDate = new Date();
    const expireDate = new Date(startDate);
    expireDate.setFullYear(startDate.getFullYear() + 1); // 1 year expiration

    const blobSAS = generateBlobSASQueryParameters(
      {
        containerName,
        blobName,
        permissions: BlobSASPermissions.parse("r"), // Read permissions
        startsOn: startDate,
        expiresOn: expireDate,
      },
      sharedKeyCredential
    ).toString();

    const sasUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${blobSAS}`;
    return sasUrl;
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}

module.exports = uploadThumbnail;
