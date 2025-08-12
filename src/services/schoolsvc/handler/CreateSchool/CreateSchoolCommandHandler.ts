import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { CreateSchoolCommand } from "./CreateSchoolCommand";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { School } from "../../../../common/domain/entities/School";

export class CreateSchoolCommandHandler implements ICommandHandler<CreateSchoolCommand, any> {
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(command: CreateSchoolCommand): Promise<any> {
    return this.schoolRepository.create(School.createClasse(command.name));
  }
}
