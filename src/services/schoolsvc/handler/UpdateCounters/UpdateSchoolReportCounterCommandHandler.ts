import { NotFoundError } from "../../../../common/application/dto/NotFoundError";
import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { UpdateSchoolReportCounterCommand } from "./UpdateSchoolReportCounterCommand";

export class UpdateSchoolReportCounterCommandHandler
  implements ICommandHandler<UpdateSchoolReportCounterCommand, void>
{
  constructor(private schoolRepository: ISchoolRepository) {}
  async execute(command: UpdateSchoolReportCounterCommand): Promise<any> {
    // Check if a school with the same name already exists
    const existingSchool = await this.schoolRepository.getSchoolById(command.schoolId);
    if (!existingSchool) {
      throw new NotFoundError(`School with Id : ${command.schoolId} not found.`);
    }
    const counter = (existingSchool.schoolreportGenerated ?? 0) + 1;

    await this.schoolRepository.updateSchoolReportGeneratedCounter(counter, command.schoolId);
  }
}
