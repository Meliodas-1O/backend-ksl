import { StudentAttendance } from "@prisma/client";
import {
  CreateStudentAttendanceCommand,
  UpdateStudentAttendanceCommand,
  DeleteStudentAttendanceCommand,
  FindStudentAttendanceByIdQuery,
  FindStudentAttendanceByStudentIdQuery,
  FindStudentAttendanceByDisciplineIdQuery,
  FindStudentAttendanceByTypeQuery,
} from "./StudentAttendanceCommandsAndQueries";
import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IStudentAttendanceRepository } from "../../../../common/domain/repository/IStudentAttendanceRepository";
import { IStudentRepository } from "../../../../common/domain/repository/IStudentRepository";

/**
 * =========================================================================
 *
 * COMMAND HANDLERS
 *
 * =========================================================================
 */

/**
 * Handles the creation of a new student attendance record.
 * This handler takes a `CreateStudentAttendanceCommand` and uses the
 * repository to persist the new record. It first verifies that the
 * student exists.
 */
export class CreateStudentAttendanceCommandHandler
  implements ICommandHandler<CreateStudentAttendanceCommand, StudentAttendance>
{
  constructor(
    private studentAttendanceRepository: IStudentAttendanceRepository,
    private studentRepository: IStudentRepository
  ) {}

  async execute(
    command: CreateStudentAttendanceCommand
  ): Promise<StudentAttendance> {
    const { studentId, disciplineId, type, date } = command;

    // Check if the student exists
    const student = await this.studentRepository.findStudentById(studentId);
    if (!student) {
      throw new Error(`Student with ID ${studentId} does not exist.`);
    }

    return this.studentAttendanceRepository.create({
      studentId,
      disciplineId,
      type,
      date,
    });
  }
}

// ---

/**
 * Handles the updating of a student attendance record.
 * It takes an `UpdateStudentAttendanceCommand` and uses the repository
 * to modify the existing record. It also checks if the student exists
 * before attempting to update the attendance record.
 */
export class UpdateStudentAttendanceCommandHandler
  implements ICommandHandler<UpdateStudentAttendanceCommand, StudentAttendance>
{
  constructor(
    private studentAttendanceRepository: IStudentAttendanceRepository,
    private studentRepository: IStudentRepository
  ) {}

  async execute(
    command: UpdateStudentAttendanceCommand
  ): Promise<StudentAttendance> {
    const { id, data } = command;

    // Check if the student attendance record exists
    const attendanceRecord = await this.studentAttendanceRepository.findById(
      id
    );
    if (!attendanceRecord) {
      throw new Error(
        `Student attendance record with ID ${id} does not exist.`
      );
    }

    // Check if the student exists before updating
    const student = await this.studentRepository.findStudentById(
      attendanceRecord.studentId
    );
    if (!student) {
      throw new Error(
        `Student with ID ${attendanceRecord.studentId} does not exist.`
      );
    }

    return this.studentAttendanceRepository.update(id, data);
  }
}

// ---

/**
 * Handles the deletion of a student attendance record.
 * It takes a `DeleteStudentAttendanceCommand` and uses the repository
 * to remove the record.
 */
export class DeleteStudentAttendanceCommandHandler
  implements ICommandHandler<DeleteStudentAttendanceCommand, StudentAttendance>
{
  constructor(
    private studentAttendanceRepository: IStudentAttendanceRepository
  ) {}

  execute(command: DeleteStudentAttendanceCommand): Promise<StudentAttendance> {
    const { id } = command;
    return this.studentAttendanceRepository.delete(id);
  }
}

/**
 * =========================================================================
 *
 * QUERY HANDLERS
 *
 * =========================================================================
 */

/**
 * Handles the fetching of a single student attendance record by ID.
 * It uses the `findById` method of the repository.
 */
export class FindStudentAttendanceByIdQueryHandler
  implements
    ICommandHandler<FindStudentAttendanceByIdQuery, StudentAttendance | null>
{
  constructor(
    private studentAttendanceRepository: IStudentAttendanceRepository
  ) {}

  execute(
    query: FindStudentAttendanceByIdQuery
  ): Promise<StudentAttendance | null> {
    const { id } = query;
    return this.studentAttendanceRepository.findById(id);
  }
}

// ---

/**
 * Handles the fetching of all attendance records for a given student.
 */
export class FindStudentAttendanceByStudentIdQueryHandler
  implements
    ICommandHandler<FindStudentAttendanceByStudentIdQuery, StudentAttendance[]>
{
  constructor(
    private studentAttendanceRepository: IStudentAttendanceRepository
  ) {}

  execute(
    query: FindStudentAttendanceByStudentIdQuery
  ): Promise<StudentAttendance[]> {
    const { studentId } = query;
    return this.studentAttendanceRepository.findByStudentId(studentId);
  }
}

// ---

/**
 * Handles the fetching of all attendance records for a given discipline.
 */
export class FindStudentAttendanceByDisciplineIdQueryHandler
  implements
    ICommandHandler<
      FindStudentAttendanceByDisciplineIdQuery,
      StudentAttendance[]
    >
{
  constructor(
    private studentAttendanceRepository: IStudentAttendanceRepository
  ) {}

  execute(
    query: FindStudentAttendanceByDisciplineIdQuery
  ): Promise<StudentAttendance[]> {
    const { disciplineId } = query;
    return this.studentAttendanceRepository.findByDisciplineId(disciplineId);
  }
}

// ---

/**
 * Handles the fetching of all attendance records of a specific type.
 */
export class FindStudentAttendanceByTypeQueryHandler
  implements
    ICommandHandler<FindStudentAttendanceByTypeQuery, StudentAttendance[]>
{
  constructor(
    private studentAttendanceRepository: IStudentAttendanceRepository
  ) {}

  execute(
    query: FindStudentAttendanceByTypeQuery
  ): Promise<StudentAttendance[]> {
    const { type } = query;
    return this.studentAttendanceRepository.findByType(type);
  }
}
