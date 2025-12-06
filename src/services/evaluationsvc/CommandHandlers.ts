import { Evaluation } from "@prisma/client";
import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { IEvaluationRepository } from "../../common/domain/repository/IEvaluationRepository";
import {
  GetAllEvaluationsQuery,
  GetEvaluationByIdQuery,
  GetEvaluationsByClasseQuery,
  GetEvaluationsByTeacherQuery,
  CreateEvaluationCommand,
  UpdateEvaluationCommand,
  DeleteEvaluationCommand,
} from "./Command";
import { IUserRepository } from "../../common/domain/repository/IUserRepository";
import { Role } from "../../common/application/dto/Role";

// Query: Get all
export class GetAllEvaluationsQueryHandler
  implements IQueryHandler<GetAllEvaluationsQuery, Evaluation[]>
{
  constructor(private readonly repository: IEvaluationRepository) {}

  async execute(query: GetAllEvaluationsQuery): Promise<Evaluation[]> {
    return this.repository.findAll(query.schoolId);
  }
}

// Query: Get by ID
export class GetEvaluationByIdQueryHandler
  implements IQueryHandler<GetEvaluationByIdQuery, Evaluation | null>
{
  constructor(private readonly repository: IEvaluationRepository) {}

  async execute(query: GetEvaluationByIdQuery): Promise<Evaluation | null> {
    return this.repository.findById(query.evaluationId, query.schoolId);
  }
}

// Query: Get by Classe
export class GetEvaluationsByClasseQueryHandler
  implements IQueryHandler<GetEvaluationsByClasseQuery, Evaluation[] | null>
{
  constructor(private readonly repository: IEvaluationRepository) {}

  async execute(query: GetEvaluationsByClasseQuery): Promise<Evaluation[] | null> {
    return this.repository.findByClasse(query.classeId, query.schoolId);
  }
}

// Query: Get by Teacher
export class GetEvaluationsByTeacherQueryHandler
  implements IQueryHandler<GetEvaluationsByTeacherQuery, Evaluation[] | null>
{
  constructor(private readonly repository: IEvaluationRepository) {}

  async execute(query: GetEvaluationsByTeacherQuery): Promise<Evaluation[] | null> {
    return this.repository.findByTeacher(query.professeurId, query.schoolId);
  }
}

// Command: Create
export class CreateEvaluationCommandHandler
  implements ICommandHandler<CreateEvaluationCommand, Evaluation>
{
  constructor(
    private readonly repository: IEvaluationRepository,
    private readonly teacherRepository: IUserRepository
  ) {}

  async execute(command: CreateEvaluationCommand): Promise<Evaluation> {
    const teacher = await this.teacherRepository.findUserById(command.professeurId);
    const roles = teacher?.getRoles()?.map((r) => r.toLocaleString());
    if (!roles || !roles.includes("TEACHER")) {
      console.log("Create evaluation error : ");
      console.log("teacher", teacher);
      console.log("roles", roles);
      console.log("command", command);
      throw new Error("Teacher with id " + command.professeurId + " not found.");
    }
    const request = {
      type: command.type,
      date: command.date,
      description: command.description,
      title: command.title,
      classeId: command.classeId,
      schoolId: command.schoolId,
      professeurId: command.professeurId,
      disciplineId: command.disciplineId,
    };
    return this.repository.create(request);
  }
}

// Command: Update
export class UpdateEvaluationCommandHandler
  implements ICommandHandler<UpdateEvaluationCommand, Evaluation | null>
{
  constructor(private readonly repository: IEvaluationRepository) {}

  async execute(command: UpdateEvaluationCommand): Promise<Evaluation | null> {
    return this.repository.update(command.evaluationId, command.schoolId, command.data);
  }
}

// Command: Delete
export class DeleteEvaluationCommandHandler
  implements ICommandHandler<DeleteEvaluationCommand, Evaluation | null>
{
  constructor(private readonly repository: IEvaluationRepository) {}

  async execute(command: DeleteEvaluationCommand): Promise<Evaluation | null> {
    return this.repository.delete(command.evaluationId, command.schoolId);
  }
}
