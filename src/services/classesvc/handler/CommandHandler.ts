import { Classe } from "../../../common/domain/entities/Classe";
import { ICommandHandler } from "../../../common/domain/contracts/ICommandHandler";
import { IQueryHandler } from "../../../common/domain/contracts/IQueryHandler";
import { IClasseRepository } from "../../../common/domain/repository/IClasseRepository";
import {
  CreateClasseCommand,
  UpdateClasseCommand,
  DeleteClasseCommand,
  GetAllClassesQuery,
  GetClasseByIdQuery,
  GetStudentsInClasseQuery,
  GetProfessorsInClasseQuery,
  GetParentsInClasseQuery,
  GetDisciplinesInClasseQuery,
  AssignMatiereToClasseCommand,
  AssignProfesseurToClasseCommand,
  RevokeProfesseurToClasseCommand,
} from "./Commands";

export class CreateClasseCommandHandler implements ICommandHandler<CreateClasseCommand, any> {
  constructor(private classeRepository: IClasseRepository) {}

  async execute(command: CreateClasseCommand): Promise<any> {
    const classe = Classe.createClasse(command.niveau, command.nom, command.schoolId);
    return this.classeRepository.create(classe);
  }
}

export class UpdateClasseCommandHandler
  implements ICommandHandler<UpdateClasseCommand, any | null>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(command: UpdateClasseCommand): Promise<any | null> {
    const classe = Classe.createClasse(command.niveau, command.nom, command.schoolId);
    return this.classeRepository.update(command.classeId, classe);
  }
}

export class DeleteClasseCommandHandler implements ICommandHandler<DeleteClasseCommand, void> {
  constructor(private classeRepository: IClasseRepository) {}

  async execute(command: DeleteClasseCommand): Promise<void> {
    return this.classeRepository.delete(command.classeId);
  }
}

// --- Query Handlers ---

export class GetAllClassesQueryHandler implements IQueryHandler<GetAllClassesQuery, any[]> {
  constructor(private classeRepository: IClasseRepository) {}

  async execute(query: GetAllClassesQuery): Promise<any[]> {
    return this.classeRepository.findAll(query.schoolId);
  }
}

export class GetClasseByIdQueryHandler implements IQueryHandler<GetClasseByIdQuery, any | null> {
  constructor(private classeRepository: IClasseRepository) {}

  async execute(query: GetClasseByIdQuery): Promise<any | null> {
    return this.classeRepository.findById(query.classeId, query.schoolId);
  }
}

export class GetStudentsInClasseQueryHandler
  implements IQueryHandler<GetStudentsInClasseQuery, any[]>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(query: GetStudentsInClasseQuery): Promise<any[]> {
    return this.classeRepository.findStudentsByClasse(query.classeId, query.schoolId);
  }
}

export class GetProfessorsInClasseQueryHandler
  implements IQueryHandler<GetProfessorsInClasseQuery, any[]>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(query: GetProfessorsInClasseQuery): Promise<any[]> {
    return this.classeRepository.findProfessorsByClasse(query.classeId, query.schoolId);
  }
}

export class GetParentsInClasseQueryHandler
  implements IQueryHandler<GetParentsInClasseQuery, any[]>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(query: GetParentsInClasseQuery): Promise<any[]> {
    return this.classeRepository.findParentsByClasse(query.classeId, query.schoolId);
  }
}

export class GetDisciplinesInClasseQueryHandler
  implements IQueryHandler<GetDisciplinesInClasseQuery, any[]>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(query: GetDisciplinesInClasseQuery): Promise<any[]> {
    return this.classeRepository.findDisciplinesByClasse(query.classeId, query.schoolId);
  }
}
export class AssignProfesseurToClasseCommandHandler
  implements ICommandHandler<AssignProfesseurToClasseCommand, Classe>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(command: AssignProfesseurToClasseCommand): Promise<Classe> {
    return this.classeRepository.assignProfesseur(
      command.classeId,
      command.professeurId,
      command.schoolId
    );
  }
}
export class RevokeProfesseurToClasseCommandHandler
  implements ICommandHandler<RevokeProfesseurToClasseCommand, void>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(command: RevokeProfesseurToClasseCommand): Promise<void> {
    return this.classeRepository.revokeProfesseur(
      command.classeId,
      command.professeurId,
      command.schoolId
    );
  }
}

export class AssignMatiereToClasseCommandHandler
  implements ICommandHandler<AssignMatiereToClasseCommand, Classe>
{
  constructor(private classeRepository: IClasseRepository) {}

  async execute(command: AssignMatiereToClasseCommand): Promise<Classe> {
    return this.classeRepository.assignMatiere(
      command.classeId,
      command.matiereId,
      command.schoolId
    );
  }
}
