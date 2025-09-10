/*
  Warnings:

  - You are about to drop the column `abscence` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `moyenne` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `retards` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[schoolId,telephone]` on the table `AppUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN "semester" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "schoolId" TEXT,
    "parentId" TEXT,
    "classeId" TEXT NOT NULL,
    CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AppUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("classeId", "createdAt", "dateOfBirth", "id", "nom", "parentId", "prenom", "schoolId") SELECT "classeId", "createdAt", "dateOfBirth", "id", "nom", "parentId", "prenom", "schoolId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_schoolId_telephone_key" ON "AppUser"("schoolId", "telephone");
