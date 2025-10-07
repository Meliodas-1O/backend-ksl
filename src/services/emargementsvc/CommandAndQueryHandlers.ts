// 🟢 Command: Create Emargement

import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { IEmargementRepository } from "../../common/domain/repository/IEmargementRepository";
import {
  CreateEmargementCommand,
  GetAllEmargementsQuery,
  GetEmargementByIdQuery,
  GetEmargementByUserIdQuery,
} from "./CommandsAndQueries";

export class CreateEmargementCommandHandler
  implements ICommandHandler<CreateEmargementCommand, any>
{
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(command: CreateEmargementCommand): Promise<any> {
    if (command.debut >= command.fin) {
      throw new Error("Start time (debut) must be before end time (fin).");
    }

    const emargement = {
      classeId: command.classeId,
      disciplineId: command.disciplineId,
      professeurId: command.professeurId,
      debut: command.debut,
      fin: command.fin,
      seanceCounter: command.seanceCounter,
      content: command.content,
      additionalInfo: command.additionalInfo,
      schoolId: command.schoolId,
    };

    return await this.emargementRepository.createEmargement(emargement);
  }
}
// 🔵 Query: Get All Emargements
export class GetAllEmargementsQueryHandler
  implements IQueryHandler<GetAllEmargementsQuery, any[]>
{
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(query: GetAllEmargementsQuery): Promise<any[]> {
    if (!query.schoolId) {
      throw new Error("School ID is required.");
    }

    return await this.emargementRepository.getAllEmargements(query.schoolId);
  }
}

export class GetEmargementByIdQueryHandler
  implements IQueryHandler<GetEmargementByIdQuery, any>
{
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(query: GetEmargementByIdQuery): Promise<any> {
    const result = await this.emargementRepository.getEmargementById(
      query.emargementId,
      query.schoolId
    );

    return result;
  }
}

export class GetEmargementByUserIdQueryHandler
  implements IQueryHandler<GetEmargementByUserIdQuery, any[]>
{
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(query: GetEmargementByUserIdQuery): Promise<any[]> {
    return await this.emargementRepository.getEmargementByUserId(
      query.professeurId,
      query.schoolId
    );
  }
}
