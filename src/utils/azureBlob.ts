import { BlobServiceClient } from "@azure/storage-blob";
import fs from "fs/promises";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME
);

export const uploadBlob = async (blobName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const localFilePath = `./uploads/${blobName}`;
  await blockBlobClient.uploadFile(localFilePath);
  console.log(`${GREEN}Uploaded ${blobName}${RESET}`);
};

export const removeBlob = async (blobPath) => {
  await fs.unlink(blobPath);
  console.log(`${RED}Removed ${blobPath} locally${RESET}`);
};
export const deleteBlob = async (blobName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.delete();
  console.log(`${RED}Deleted ${blobName}${RESET}`);
};

export const deleteBlobs = async () => {
  const blobs = containerClient.listBlobsFlat();

  for await (const blob of blobs) {
    deleteBlob(blob.name);
  }
};
