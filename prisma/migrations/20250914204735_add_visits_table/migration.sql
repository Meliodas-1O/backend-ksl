-- CreateTable
CREATE TABLE "Visits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roles" TEXT NOT NULL,
    "visitTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorType" TEXT NOT NULL,
    "userId" TEXT,
    "schoolId" TEXT NOT NULL,
    CONSTRAINT "Visits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Visits_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
