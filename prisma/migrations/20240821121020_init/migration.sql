/*
  Warnings:

  - Added the required column `videoURL` to the `Upload` table without a default value. This is not possible if the table is not empty.

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
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Upload_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Upload" ("authorId", "description", "id", "likes", "title") SELECT "authorId", "description", "id", "likes", "title" FROM "Upload";
DROP TABLE "Upload";
ALTER TABLE "new_Upload" RENAME TO "Upload";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
