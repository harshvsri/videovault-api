import { BlobServiceClient } from "@azure/storage-blob";
import fs from "fs/promises";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient =
  blobServiceClient.getContainerClient("videovault-videos");

export const uploadBlob = async (blobName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const localFilePath = `./uploads/${blobName}`;
  await blockBlobClient.uploadFile(localFilePath);
  console.log(`✅ Uploaded ${blobName}`);
};

export const removeBlob = (blobPath) => fs.unlink(blobPath);

export const deleteBlob = async (blobName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.delete();
  console.log(`🗑️ Deleted ${blobName}`);
};

export const deleteBlobs = async () => {
  const blobs = containerClient.listBlobsFlat();

  for await (const blob of blobs) {
    deleteBlob(blob.name);
    console.log(blob.name);
  }
};
