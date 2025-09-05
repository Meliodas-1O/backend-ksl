import { StudentAttendance } from "@prisma/client";

/**
 * Interface for the StudentAttendance data repository.
 * Defines the contract for all operations related to student attendance records.
 */
export interface IStudentAttendanceRepository {
  /**
   * Creates a new student attendance record.
   * @param data The attendance data to create.
   * @returns A Promise resolving to the newly created StudentAttendance record.
   */
  create(data: {
    studentId: string;
    disciplineId: string;
    type: string;
    date: Date;
  }): Promise<StudentAttendance>;

  /**
   * Finds a student attendance record by its unique ID.
   * @param id The ID of the attendance record.
   * @returns A Promise resolving to the found record or null if not found.
   */
  findById(id: string): Promise<StudentAttendance | null>;

  /**
   * Finds all attendance records for a specific student.
   * @param studentId The ID of the student.
   * @returns A Promise resolving to an array of StudentAttendance records.
   */
  findByStudentId(studentId: string): Promise<StudentAttendance[]>;

  /**
   * Finds all attendance records for a specific discipline.
   * @param disciplineId The ID of the discipline.
   * @returns A Promise resolving to an array of StudentAttendance records.
   */
  findByDisciplineId(disciplineId: string): Promise<StudentAttendance[]>;

  /**
   * Finds attendance records by type (e.g., 'Present', 'Absent').
   * @param type The type of attendance.
   * @returns A Promise resolving to an array of StudentAttendance records.
   */
  findByType(type: string): Promise<StudentAttendance[]>;

  /**
   * Updates an existing student attendance record.
   * @param id The ID of the record to update.
   * @param data The new data for the record.
   * @returns A Promise resolving to the updated StudentAttendance record.
   */
  update(
    id: string,
    data: {
      type?: string;
      date?: Date;
      disciplineId?: string;
    }
  ): Promise<StudentAttendance>;

  /**
   * Deletes a student attendance record by its ID.
   * @param id The ID of the record to delete.
   * @returns A Promise resolving to the deleted StudentAttendance record.
   */
  delete(id: string): Promise<StudentAttendance>;
}
