import { Note } from "@prisma/client";

/**
 * =========================================================================
 *
 * COMMANDS (MUTATIONS)
 *
 * =========================================================================
 */

/**
 * Command to create a new note record.
 * @property {string} schoolId - The ID of the school the note belongs to.
 * @property {string} classeId - The ID of the class the note is for.
 * @property {string} studentId - The ID of the student the note is for.
 * @property {string} disciplineId - The ID of the discipline the note is for.
 * @property {string} type - The type of the note (e.g., 'Contrôle', 'Évaluation').
 * @property {boolean} devoir - Indicates if the note is for homework.
 * @property {number} note - The numerical grade of the note.
 * @property {Date} date - The date the note was given.
 * @property {string} [appreciation] - An optional appreciation or comment for the note.
 * @property {number} coefficient - The coefficient for the note.
 */
export class CreateNoteCommand {
  constructor(
    public schoolId: string,
    public classeId: string,
    public studentId: string,
    public disciplineId: string,
    public professeurId: string,
    public type: string,
    public devoir: boolean,
    public note: number,
    public date: Date,
    public coefficient: number,
    public appreciation: string | null
  ) {}
}

/**
 * Command to update an existing note record.
 * @property {string} id - The ID of the note to update.
 * @property {string} schoolId - The ID of the school to verify ownership.
 * @property {Partial<Omit<Note, 'id' | 'createdAt'>>} data - The partial data to update the note with.
 */
export class UpdateNoteCommand {
  constructor(
    public id: string,
    public schoolId: string,
    public data: Partial<Omit<Note, "id" | "createdAt">>
  ) {}
}

/**
 * Command to delete a note record.
 * @property {string} id - The ID of the note to delete.
 * @property {string} schoolId - The ID of the school to verify ownership.
 */
export class DeleteNoteCommand {
  constructor(public id: string, public schoolId: string) {}
}

/**
 * =========================================================================
 *
 * QUERIES (FETCHING)
 *
 * =========================================================================
 */

/**
 * Query to find a single note by its ID.
 * @property {string} id - The ID of the note to find.
 * @property {string} schoolId - The ID of the school to verify ownership.
 */
export class FindNoteByIdQuery {
  constructor(public id: string, public schoolId: string) {}
}

/**
 * Query to find all notes for a specific student.
 * @property {string} studentId - The ID of the student.
 * @property {string} schoolId - The ID of the school to verify ownership.
 */
export class FindNotesByStudentIdQuery {
  constructor(public studentId: string, public schoolId: string) {}
}

/**
 * Query to find all notes for a specific class.
 * @property {string} classeId - The ID of the class.
 * @property {string} schoolId - The ID of the school to verify ownership.
 */
export class FindNotesByClasseIdQuery {
  constructor(public classeId: string, public schoolId: string) {}
}

/**
 * Query to find all notes for a specific discipline.
 * @property {string} disciplineId - The ID of the discipline.
 * @property {string} schoolId - The ID of the school to verify ownership.
 */
export class FindNotesByDisciplineIdQuery {
  constructor(public disciplineId: string, public schoolId: string) {}
}

/**
 * Query to find all notes for a specific teacher.
 * @property {string} disciplineId - The ID of the Teacher.
 * @property {string} schoolId - The ID of the school to verify ownership.
 */
export class FindNotesByTeacherIdQuery {
  constructor(public teacherId: string, public schoolId: string) {}
}

/**
 * Query to find all notes for a specific school.
 * @property {string} schoolId - The ID of the school.
 */
export class FindNotesBySchoolIdQuery {
  constructor(public schoolId: string) {}
}
