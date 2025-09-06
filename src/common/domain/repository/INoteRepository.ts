import { Note } from "@prisma/client";

/**
 * Interface defining the contract for the Note repository.
 * This ensures consistency and decouples our application logic from the database implementation.
 */
export interface INoteRepository {
  /**
   * Creates a new note record in the database.
   * @param data The data for the new note.
   * @returns A promise that resolves with the created Note object.
   */
  create(data: Omit<Note, "id" | "createdAt">): Promise<Note>;

  /**
   * Updates an existing note record by its unique ID.
   * @param id The unique identifier of the note to update.
   * @param data The partial data to update.
   * @returns A promise that resolves with the updated Note object.
   */
  update(id: string, data: Partial<Note>): Promise<Note>;

  /**
   * Deletes a note record by its unique ID.
   * @param id The unique identifier of the note to delete.
   * @returns A promise that resolves with the deleted Note object.
   */
  delete(id: string, schoolId: string): Promise<Note>;

  /**
   * Finds a single note by its unique ID.
   * @param id The unique identifier of the note.
   * @returns A promise that resolves with the found Note or null if not found.
   */
  findById(id: string, schoolId: string): Promise<Note | null>;

  /**
   * Finds all notes for a specific student.
   * @param studentId The ID of the student.
   * @returns A promise that resolves with an array of notes.
   */
  findByStudentId(studentId: string, schoolId: string): Promise<Note[]>;

  /**
   * Finds all notes for a specific class.
   * @param classeId The ID of the class.
   * @returns A promise that resolves with an array of notes.
   */
  findByClasseId(classeId: string, schoolId: string): Promise<Note[]>;

  /**
   * Finds all notes for a specific discipline.
   * @param disciplineId The ID of the discipline.
   * @returns A promise that resolves with an array of notes.
   */
  findByDisciplineId(disciplineId: string, schoolId: string): Promise<Note[]>;

  /**
   * Finds all notes for a specific discipline.
   * @param disciplineId The ID of the discipline.
   * @returns A promise that resolves with an array of notes.
   */
  findByTeacherId(professeurId: string, schoolId: string): Promise<Note[]>;
  /**
   * Finds all notes for a specific discipline.
   * @param disciplineId The ID of the discipline.
   * @returns A promise that resolves with an array of notes.
   */
  findBySchoolId(schoolId: string): Promise<Note[]>;
}
