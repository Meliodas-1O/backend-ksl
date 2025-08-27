-- CreateTable
CREATE TABLE "_TeacherDisciplines" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TeacherDisciplines_A_fkey" FOREIGN KEY ("A") REFERENCES "AppUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TeacherDisciplines_B_fkey" FOREIGN KEY ("B") REFERENCES "Discipline" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherDisciplines_AB_unique" ON "_TeacherDisciplines"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherDisciplines_B_index" ON "_TeacherDisciplines"("B");
