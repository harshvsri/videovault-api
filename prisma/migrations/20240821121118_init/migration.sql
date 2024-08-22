/*
  Warnings:

  - You are about to drop the column `authorId` on the `Upload` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Upload" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoURL" TEXT NOT NULL,
    "thumbnailURL" TEXT,
    "likes" INTEGER DEFAULT 0,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Upload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Upload" ("description", "id", "likes", "thumbnailURL", "title", "videoURL") SELECT "description", "id", "likes", "thumbnailURL", "title", "videoURL" FROM "Upload";
DROP TABLE "Upload";
ALTER TABLE "new_Upload" RENAME TO "Upload";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
