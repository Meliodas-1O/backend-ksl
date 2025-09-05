import { PrismaClient, StudentAttendance } from "@prisma/client";
import { IStudentAttendanceRepository } from "../../../common/domain/repository/IStudentAttendanceRepository";

const prisma = new PrismaClient(); // Prisma instance

/**
 * Prisma implementation of the StudentAttendance repository.
 * This class handles all data access logic for student attendance records using Prisma.
 */
export const studentAttendancePrismaRepository: IStudentAttendanceRepository = {
  /**
   * Creates a new student attendance record in the database.
   * @param data The attendance data to create.
   * @returns The newly created StudentAttendance object.
   */
  async create(data: {
    studentId: string;
    disciplineId: string;
    type: string;
    date: Date;
  }): Promise<StudentAttendance> {
    const attendance = await prisma.studentAttendance.create({ data });
    return attendance;
  },

  /**
   * Finds a student attendance record by its unique ID.
   * @param id The ID of the attendance record.
   * @returns The found StudentAttendance record or null if not found.
   */
  async findById(id: string): Promise<StudentAttendance | null> {
    const attendance = await prisma.studentAttendance.findUnique({
      where: { id },
    });
    return attendance;
  },

  /**
   * Finds all attendance records for a specific student.
   * @param studentId The ID of the student.
   * @returns An array of StudentAttendance records for the given student.
   */
  async findByStudentId(studentId: string): Promise<StudentAttendance[]> {
    const attendances = await prisma.studentAttendance.findMany({
      where: { studentId },
    });
    return attendances;
  },

  /**
   * Finds all attendance records for a specific discipline.
   * @param disciplineId The ID of the discipline.
   * @returns An array of StudentAttendance records for the given discipline.
   */
  async findByDisciplineId(disciplineId: string): Promise<StudentAttendance[]> {
    const attendances = await prisma.studentAttendance.findMany({
      where: { disciplineId },
    });
    return attendances;
  },

  /**
   * Finds attendance records by type (e.g., 'Present', 'Absent').
   * @param type The type of attendance.
   * @returns An array of StudentAttendance records with the specified type.
   */
  async findByType(type: string): Promise<StudentAttendance[]> {
    const attendances = await prisma.studentAttendance.findMany({
      where: { type },
    });
    return attendances;
  },

  /**
   * Updates an existing student attendance record.
   * @param id The ID of the record to update.
   * @param data The new data for the record.
   * @returns The updated StudentAttendance record.
   */
  async update(
    id: string,
    data: {
      type?: string;
      date?: Date;
      disciplineId?: string;
    }
  ): Promise<StudentAttendance> {
    const attendance = await prisma.studentAttendance.update({
      where: { id },
      data,
    });
    return attendance;
  },

  /**
   * Deletes a student attendance record by its ID.
   * @param id The ID of the record to delete.
   * @returns The deleted StudentAttendance record.
   */
  async delete(id: string): Promise<StudentAttendance> {
    const attendance = await prisma.studentAttendance.delete({
      where: { id },
    });
    return attendance;
  },
};
