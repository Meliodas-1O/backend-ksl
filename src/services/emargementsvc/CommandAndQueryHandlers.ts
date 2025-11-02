// 🟢 Command: Create Emargement

import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { IEmargementRepository } from "../../common/domain/repository/IEmargementRepository";
import {
  CreateEmargementCommand,
  DeleteEmargementCommand,
  GetAllEmargementsQuery,
  GetEmargementByIdQuery,
  GetEmargementByUserIdQuery,
  UpdateEmargementCommand,
} from "./CommandsAndQueries";
import { CreateEmargementDto } from "./Models";

export class CreateEmargementCommandHandler
  implements ICommandHandler<CreateEmargementCommand, any>
{
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(command: CreateEmargementCommand): Promise<any> {
    if (command.debut >= command.fin) {
      throw new Error("Start time (debut) must be before end time (fin).");
    }

    const emargement: CreateEmargementDto = {
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

export class DeleteEmargementCommandHandler
  implements ICommandHandler<DeleteEmargementCommand, any>
{
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(command: DeleteEmargementCommand): Promise<any> {
    const existingEmargement = await this.emargementRepository.getEmargementById(
      command.emargementId,
      command.schoolId
    );
    if (!existingEmargement) {
      return;
    }
    await this.emargementRepository.deleteEmargementById(command.emargementId, command.schoolId);
  }
}

export class UpdateEmargementCommandHandler
  implements ICommandHandler<UpdateEmargementCommand, any>
{
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(command: UpdateEmargementCommand): Promise<any> {
    if (command.emargement.debut >= command.emargement.fin) {
      throw new Error("Start time (debut) must be before end time (fin).");
    }

    const existingEmargement = await this.emargementRepository.getEmargementById(
      command.emargementId,
      command.schoolId
    );
    if (!existingEmargement) {
      throw new Error(`Emargement with id : ${command.emargementId} not found.`);
    }

    const emargement: CreateEmargementDto = {
      classeId: command.emargement.classeId,
      disciplineId: command.emargement.disciplineId,
      professeurId: existingEmargement.professeurId,
      debut: command.emargement.debut,
      fin: command.emargement.fin,
      seanceCounter: command.emargement.seanceCounter,
      content: command.emargement.content,
      additionalInfo: command.emargement.additionalInfo,
      schoolId: command.emargement.schoolId,
    };

    return await this.emargementRepository.updateEmargementById(
      emargement,
      command.emargementId,
      command.schoolId
    );
  }
}
// 🔵 Query: Get All Emargements
export class GetAllEmargementsQueryHandler implements IQueryHandler<GetAllEmargementsQuery, any[]> {
  constructor(private emargementRepository: IEmargementRepository) {}

  async execute(query: GetAllEmargementsQuery): Promise<any[]> {
    if (!query.schoolId) {
      throw new Error("School ID is required.");
    }

    return await this.emargementRepository.getAllEmargements(query.schoolId);
  }
}

export class GetEmargementByIdQueryHandler implements IQueryHandler<GetEmargementByIdQuery, any> {
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
