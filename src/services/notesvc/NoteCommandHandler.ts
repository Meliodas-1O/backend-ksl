import { Note } from "@prisma/client";
import {
  CreateNoteCommand,
  UpdateNoteCommand,
  DeleteNoteCommand,
  FindNoteByIdQuery,
  FindNotesByStudentIdQuery,
  FindNotesByClasseIdQuery,
  FindNotesByDisciplineIdQuery,
  FindNotesBySchoolIdQuery,
  FindNotesByTeacherIdQuery,
} from "./NoteCommands";
import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { IClasseRepository } from "../../common/domain/repository/IClasseRepository";
import { IDisciplineRepository } from "../../common/domain/repository/IDisciplineRepository";
import { INoteRepository } from "../../common/domain/repository/INoteRepository";
import { IStudentRepository } from "../../common/domain/repository/IStudentRepository";

/**
 * =========================================================================
 *
 * COMMAND HANDLERS
 *
 * =========================================================================
 */

/**
 * Handles the creation of a new note record.
 * This handler checks for the existence of the student, discipline, and class
 * before creating the note to prevent orphaned records.
 */
export class CreateNoteCommandHandler implements ICommandHandler<CreateNoteCommand, Note> {
  constructor(
    private noteRepository: INoteRepository,
    private studentRepository: IStudentRepository,
    private disciplineRepository: IDisciplineRepository,
    private classeRepository: IClasseRepository
  ) {}

  async execute(command: CreateNoteCommand): Promise<Note> {
    const { schoolId, studentId, disciplineId, classeId, ...noteData } = command;

    // Check if the student exists within the specified school
    const studentExists = await this.studentRepository.findStudentById(studentId);
    if (!studentExists) {
      throw new Error(`Student with ID ${studentId} not found in school ${schoolId}.`);
    }

    // Check if the discipline exists within the specified school
    const disciplineExists = await this.disciplineRepository.findDisciplineById(
      disciplineId,
      schoolId
    );
    if (!disciplineExists) {
      throw new Error(`Discipline with ID ${disciplineId} not found in school ${schoolId}.`);
    }

    // Check if the class exists within the specified school
    const classeExists = await this.classeRepository.findById(classeId, schoolId);
    if (!classeExists) {
      throw new Error(`Class with ID ${classeId} not found in school ${schoolId}.`);
    }

    return this.noteRepository.create({
      ...noteData,
      schoolId,
      studentId,
      disciplineId,
      classeId,
    });
  }
}

/**
 * Handles the updating of a note record.
 * It first verifies that the note exists and belongs to the correct school.
 * It also checks for the existence of any updated foreign keys (student, discipline, class).
 */
export class UpdateNoteCommandHandler implements ICommandHandler<UpdateNoteCommand, Note> {
  constructor(
    private noteRepository: INoteRepository,
    private studentRepository: IStudentRepository,
    private disciplineRepository: IDisciplineRepository,
    private classeRepository: IClasseRepository
  ) {}

  async execute(command: UpdateNoteCommand): Promise<Note> {
    const { id, schoolId, data } = command;

    // Check if the note exists and belongs to the school
    const noteToUpdate = await this.noteRepository.findById(id, schoolId);
    if (!noteToUpdate) {
      throw new Error(`Note with ID ${id} not found in school ${schoolId}.`);
    }

    // Optional checks for updated foreign keys
    if (data.studentId) {
      const studentExists = await this.studentRepository.findStudentById(data.studentId);
      if (!studentExists) {
        throw new Error(`Student with ID ${data.studentId} not found in school ${schoolId}.`);
      }
    }
    if (data.disciplineId) {
      const disciplineExists = await this.disciplineRepository.findDisciplineById(
        data.disciplineId,
        schoolId
      );
      if (!disciplineExists) {
        throw new Error(`Discipline with ID ${data.disciplineId} not found in school ${schoolId}.`);
      }
    }
    if (data.classeId) {
      const classeExists = await this.classeRepository.findById(data.classeId, schoolId);
      if (!classeExists) {
        throw new Error(`Class with ID ${data.classeId} not found in school ${schoolId}.`);
      }
    }

    return this.noteRepository.update(id, data);
  }
}

/**
 * Handles the deletion of a note record.
 * It first verifies that the note exists and belongs to the correct school.
 */
export class DeleteNoteCommandHandler implements ICommandHandler<DeleteNoteCommand, Note> {
  constructor(private noteRepository: INoteRepository) {}

  async execute(command: DeleteNoteCommand): Promise<Note> {
    const { id, schoolId } = command;

    // Check if the note exists and belongs to the school
    const noteToDelete = await this.noteRepository.findById(id, schoolId);
    if (!noteToDelete) {
      throw new Error(`Note with ID ${id} not found in school ${schoolId}.`);
    }

    return this.noteRepository.delete(id, schoolId);
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
 * Handles the fetching of a single note by ID, scoped by school ID.
 */
export class FindNoteByIdQueryHandler implements ICommandHandler<FindNoteByIdQuery, Note | null> {
  constructor(private noteRepository: INoteRepository) {}

  execute(query: FindNoteByIdQuery): Promise<Note | null> {
    const { id, schoolId } = query;
    return this.noteRepository.findById(id, schoolId);
  }
}

/**
 * Handles the fetching of all notes for a given student, scoped by school ID.
 */
export class FindNotesByStudentIdQueryHandler
  implements ICommandHandler<FindNotesByStudentIdQuery, Note[]>
{
  constructor(private noteRepository: INoteRepository) {}

  execute(query: FindNotesByStudentIdQuery): Promise<Note[]> {
    const { studentId, schoolId } = query;
    return this.noteRepository.findByStudentId(studentId, schoolId);
  }
}

/**
 * Handles the fetching of all notes for a given class, scoped by school ID.
 */
export class FindNotesByClasseIdQueryHandler
  implements ICommandHandler<FindNotesByClasseIdQuery, Note[]>
{
  constructor(private noteRepository: INoteRepository) {}

  execute(query: FindNotesByClasseIdQuery): Promise<Note[]> {
    const { classeId, schoolId } = query;
    return this.noteRepository.findByClasseId(classeId, schoolId);
  }
}

/**
 * Handles the fetching of all notes for a given discipline, scoped by school ID.
 */
export class FindNotesByDisciplineIdQueryHandler
  implements ICommandHandler<FindNotesByDisciplineIdQuery, Note[]>
{
  constructor(private noteRepository: INoteRepository) {}

  execute(query: FindNotesByDisciplineIdQuery): Promise<Note[]> {
    const { disciplineId, schoolId } = query;
    return this.noteRepository.findByDisciplineId(disciplineId, schoolId);
  }
}

/**
 * Handles the fetching of all notes for a given discipline, scoped by school ID.
 */
export class FindNotesByTeacherIdQueryHandler
  implements ICommandHandler<FindNotesByTeacherIdQuery, Note[]>
{
  constructor(private noteRepository: INoteRepository) {}

  execute(query: FindNotesByTeacherIdQuery): Promise<Note[]> {
    const { teacherId, schoolId } = query;
    return this.noteRepository.findByTeacherId(teacherId, schoolId);
  }
}

/**
 * Handles the fetching of all notes for a given school.
 */
export class FindNotesBySchoolIdQueryHandler
  implements ICommandHandler<FindNotesBySchoolIdQuery, Note[]>
{
  constructor(private noteRepository: INoteRepository) {}

  execute(query: FindNotesBySchoolIdQuery): Promise<Note[]> {
    const { schoolId } = query;
    return this.noteRepository.findBySchoolId(schoolId);
  }
}
