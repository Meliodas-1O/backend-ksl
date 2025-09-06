/*
  Warnings:

  - Added the required column `schoolId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classeId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "devoir" BOOLEAN NOT NULL,
    "note" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "appreciation" TEXT,
    "coefficient" REAL NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    CONSTRAINT "Note_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("appreciation", "classeId", "coefficient", "createdAt", "date", "devoir", "disciplineId", "id", "note", "studentId", "type") SELECT "appreciation", "classeId", "coefficient", "createdAt", "date", "devoir", "disciplineId", "id", "note", "studentId", "type" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
