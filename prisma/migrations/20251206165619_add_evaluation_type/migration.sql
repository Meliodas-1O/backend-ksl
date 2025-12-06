-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evaluation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'EVALUATION',
    "professeurId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "classeId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    CONSTRAINT "Evaluation_professeurId_fkey" FOREIGN KEY ("professeurId") REFERENCES "AppUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Evaluation" ("classeId", "createdAt", "date", "description", "disciplineId", "id", "professeurId", "schoolId", "title") SELECT "classeId", "createdAt", "date", "description", "disciplineId", "id", "professeurId", "schoolId", "title" FROM "Evaluation";
DROP TABLE "Evaluation";
ALTER TABLE "new_Evaluation" RENAME TO "Evaluation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
