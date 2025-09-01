-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AppUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "schoolId" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "telephone" TEXT,
    "profession" TEXT,
    "biographie" TEXT,
    "adresse" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AppUser_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AppUser" ("adresse", "biographie", "createdAt", "email", "id", "nom", "password", "prenom", "profession", "schoolId", "telephone") SELECT "adresse", "biographie", "createdAt", "email", "id", "nom", "password", "prenom", "profession", "schoolId", "telephone" FROM "AppUser";
DROP TABLE "AppUser";
ALTER TABLE "new_AppUser" RENAME TO "AppUser";
CREATE UNIQUE INDEX "AppUser_schoolId_email_key" ON "AppUser"("schoolId", "email");
CREATE TABLE "new_Classe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "niveau" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "schoolId" TEXT,
    CONSTRAINT "Classe_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Classe" ("createdAt", "id", "niveau", "nom", "schoolId") SELECT "createdAt", "id", "niveau", "nom", "schoolId" FROM "Classe";
DROP TABLE "Classe";
ALTER TABLE "new_Classe" RENAME TO "Classe";
CREATE TABLE "new_ClasseProfesseur" (
    "classeId" TEXT NOT NULL,
    "professeurId" TEXT NOT NULL,

    PRIMARY KEY ("classeId", "professeurId"),
    CONSTRAINT "ClasseProfesseur_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClasseProfesseur_professeurId_fkey" FOREIGN KEY ("professeurId") REFERENCES "AppUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClasseProfesseur" ("classeId", "professeurId") SELECT "classeId", "professeurId" FROM "ClasseProfesseur";
DROP TABLE "ClasseProfesseur";
ALTER TABLE "new_ClasseProfesseur" RENAME TO "ClasseProfesseur";
CREATE TABLE "new_Cours" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disciplineId" TEXT NOT NULL,
    "jour" TEXT NOT NULL,
    "heure" TEXT NOT NULL,
    "professeurId" TEXT NOT NULL,
    "classeId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    CONSTRAINT "Cours_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cours_professeurId_fkey" FOREIGN KEY ("professeurId") REFERENCES "AppUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cours_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cours_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cours" ("classeId", "createdAt", "disciplineId", "heure", "id", "jour", "professeurId", "schoolId") SELECT "classeId", "createdAt", "disciplineId", "heure", "id", "jour", "professeurId", "schoolId" FROM "Cours";
DROP TABLE "Cours";
ALTER TABLE "new_Cours" RENAME TO "Cours";
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
    CONSTRAINT "Note_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("appreciation", "classeId", "coefficient", "createdAt", "date", "devoir", "disciplineId", "id", "note", "studentId", "type") SELECT "appreciation", "classeId", "coefficient", "createdAt", "date", "devoir", "disciplineId", "id", "note", "studentId", "type" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "abscence" INTEGER NOT NULL,
    "retards" INTEGER NOT NULL,
    "moyenne" REAL NOT NULL,
    "schoolId" TEXT,
    "parentId" TEXT,
    "classeId" TEXT NOT NULL,
    CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AppUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("abscence", "classeId", "createdAt", "dateOfBirth", "id", "moyenne", "nom", "parentId", "prenom", "retards", "schoolId") SELECT "abscence", "classeId", "createdAt", "dateOfBirth", "id", "moyenne", "nom", "parentId", "prenom", "retards", "schoolId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE TABLE "new_UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "roleId"),
    CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserRole" ("roleId", "userId") SELECT "roleId", "userId" FROM "UserRole";
DROP TABLE "UserRole";
ALTER TABLE "new_UserRole" RENAME TO "UserRole";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
