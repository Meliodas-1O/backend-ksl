import { NotFoundError } from "../../../../common/application/dto/NotFoundError";
import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { UpdateStudentReportCounterCommand } from "./UpdateStudentReportCounterCommand";

export class UpdateStudentReportCounterCommandHandler
  implements ICommandHandler<UpdateStudentReportCounterCommand, void>
{
  constructor(private schoolRepository: ISchoolRepository) {}
  async execute(command: UpdateStudentReportCounterCommand): Promise<any> {
    // Check if a school with the same name already exists
    const existingSchool = await this.schoolRepository.getSchoolById(command.schoolId);
    if (!existingSchool) {
      throw new NotFoundError(`School with Id : ${command.schoolId} not found.`);
    }
    const counter = (existingSchool.studentReportGenerated ?? 0) + 1;

    await this.schoolRepository.updateStudentReportGeneratedCounter(counter, command.schoolId);
  }
}
