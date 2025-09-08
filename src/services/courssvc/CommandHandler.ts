import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { ICoursRepository } from "../../common/domain/repository/ICoursRepository";
import {
  CreateCoursCommand,
  UpdateCoursCommand,
  DeleteCoursCommand,
  AssignProfesseurToCoursCommand,
  AssignMatiereToCoursCommand,
  GetAllCoursQuery,
  GetCoursByClasseAndDayQuery,
  GetCoursByClasseAndWeekQuery,
  GetCoursByClasseQuery,
  GetCoursByDayAndHourQuery,
  GetCoursByDayQuery,
  GetCoursByIdQuery,
  GetCoursByProfesseurAndDayQuery,
  GetCoursByProfesseurAndWeekQuery,
  GetCoursByProfesseurQuery,
  GetCoursByWeekQuery,
  GetAllDisciplinesQuery,
  GetDisciplineByIdQuery,
  AssignDisciplinesToTeacherCommand,
  RevokeDisciplinesFromTeacherCommand,
} from "./Commands";
import { Cours } from "../../common/domain/entities/Cours";
import { IDisciplineRepository } from "../../common/domain/repository/IDisciplineRepository";

export class CreateCoursCommandHandler implements ICommandHandler<CreateCoursCommand, any> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(command: CreateCoursCommand): Promise<any> {
    const cours = Cours.createCours(
      command.jour,
      command.heure,
      command.disciplineId,
      command.professeurId,
      command.classeId,
      command.schoolId
    );
    return this.coursRepository.create(cours);
  }
}

export class UpdateCoursCommandHandler implements ICommandHandler<UpdateCoursCommand, any | null> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(command: UpdateCoursCommand): Promise<any | null> {
    const cours = Cours.createCours(
      command.jour,
      command.heure,
      command.disciplineId,
      command.professeurId,
      command.classeId,
      command.schoolId
    );
    return this.coursRepository.update(command.coursId, cours);
  }
}

export class DeleteCoursCommandHandler implements ICommandHandler<DeleteCoursCommand, void> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(command: DeleteCoursCommand): Promise<void> {
    return this.coursRepository.delete(command.coursId);
  }
}

export class AssignProfesseurToCoursCommandHandler
  implements ICommandHandler<AssignProfesseurToCoursCommand, any>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(command: AssignProfesseurToCoursCommand): Promise<any> {
    return this.coursRepository.assignProfesseur(
      command.coursId,
      command.professeurId,
      command.schoolId
    );
  }
}

export class AssignMatiereToCoursCommandHandler
  implements ICommandHandler<AssignMatiereToCoursCommand, any>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(command: AssignMatiereToCoursCommand): Promise<any> {
    return this.coursRepository.assignMatiere(command.coursId, command.matiereId, command.schoolId);
  }
}

export class GetAllCoursQueryHandler implements IQueryHandler<GetAllCoursQuery, any[]> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetAllCoursQuery): Promise<any[]> {
    return this.coursRepository.findAll(query.schoolId);
  }
}

export class GetCoursByIdQueryHandler implements IQueryHandler<GetCoursByIdQuery, any | null> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByIdQuery): Promise<any | null> {
    return this.coursRepository.findById(query.coursId, query.schoolId);
  }
}

export class GetCoursByProfesseurQueryHandler
  implements IQueryHandler<GetCoursByProfesseurQuery, any[]>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByProfesseurQuery): Promise<any[]> {
    return this.coursRepository.findByProfesseur(query.professeurId, query.schoolId);
  }
}

export class GetCoursByClasseQueryHandler implements IQueryHandler<GetCoursByClasseQuery, any[]> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByClasseQuery): Promise<any[]> {
    return this.coursRepository.findByClasse(query.classeId, query.schoolId);
  }
}

export class GetCoursByDayQueryHandler implements IQueryHandler<GetCoursByDayQuery, any[]> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByDayQuery): Promise<any[]> {
    return this.coursRepository.findByDay(query.day, query.schoolId);
  }
}

export class GetCoursByDayAndHourQueryHandler
  implements IQueryHandler<GetCoursByDayAndHourQuery, any[]>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByDayAndHourQuery): Promise<any[]> {
    return this.coursRepository.findByDayAndHour(query.day, query.hour, query.schoolId);
  }
}

export class GetCoursByWeekQueryHandler implements IQueryHandler<GetCoursByWeekQuery, any[]> {
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByWeekQuery): Promise<any[]> {
    return this.coursRepository.findByWeek(query.weekStart, query.weekEnd, query.schoolId);
  }
}

export class GetCoursByProfesseurAndDayQueryHandler
  implements IQueryHandler<GetCoursByProfesseurAndDayQuery, any[]>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByProfesseurAndDayQuery): Promise<any[]> {
    return this.coursRepository.findByProfesseurAndDay(
      query.professeurId,
      query.day,
      query.schoolId
    );
  }
}

export class GetCoursByProfesseurAndWeekQueryHandler
  implements IQueryHandler<GetCoursByProfesseurAndWeekQuery, any[]>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByProfesseurAndWeekQuery): Promise<any[]> {
    return this.coursRepository.findByProfesseurAndWeek(
      query.professeurId,
      query.weekStart,
      query.weekEnd,
      query.schoolId
    );
  }
}

export class GetCoursByClasseAndDayQueryHandler
  implements IQueryHandler<GetCoursByClasseAndDayQuery, any[]>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByClasseAndDayQuery): Promise<any[]> {
    return this.coursRepository.findByClasseAndDay(query.classeId, query.day, query.schoolId);
  }
}

export class GetCoursByClasseAndWeekQueryHandler
  implements IQueryHandler<GetCoursByClasseAndWeekQuery, any[]>
{
  constructor(private coursRepository: ICoursRepository) {}

  async execute(query: GetCoursByClasseAndWeekQuery): Promise<any[]> {
    return this.coursRepository.findByClasseAndWeek(
      query.classeId,
      query.weekStart,
      query.weekEnd,
      query.schoolId
    );
  }
}

export class GetAllDisciplinesQueryHandler implements IQueryHandler<GetAllDisciplinesQuery, any[]> {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute(query: GetAllDisciplinesQuery): Promise<any[]> {
    return this.disciplineRepository.findAllDisplines(query.schoolId);
  }
}
export class GetDisciplineByIdQueryHandler implements IQueryHandler<GetDisciplineByIdQuery, any> {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute(query: GetDisciplineByIdQuery): Promise<any> {
    return this.disciplineRepository.findDisciplineById(query.id, query.schoolId);
  }
}

export class AssignDisciplinesToTeacherCommandHandler
  implements ICommandHandler<AssignDisciplinesToTeacherCommand>
{
  constructor(private readonly appUserRepository: IDisciplineRepository) {}

  async execute(command: AssignDisciplinesToTeacherCommand): Promise<any> {
    const { teacherId, disciplineIds } = command;

    return this.appUserRepository.assignDisciplineToTeacher(teacherId, disciplineIds);
  }
}

export class RevokeDisciplinesFromTeacherCommandHandler
  implements ICommandHandler<RevokeDisciplinesFromTeacherCommand>
{
  constructor(private readonly appUserRepository: IDisciplineRepository) {}

  async execute(command: RevokeDisciplinesFromTeacherCommand): Promise<any> {
    const { teacherId, disciplineIds } = command;

    return this.appUserRepository.revokeDisciplineToTeacher(teacherId, disciplineIds);
  }
}
