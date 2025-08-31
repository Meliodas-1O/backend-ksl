import { NotFoundError } from "../../../../common/application/dto/NotFoundError";
import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { School } from "../../../../common/domain/entities/School";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { UpdateSchoolQuery } from "./UpdateSchoolQuery";

export class UpdateSchoolQueryHandler implements ICommandHandler<UpdateSchoolQuery, any> {
  constructor(private adminRepository: ISchoolRepository) {}
  async execute(command: UpdateSchoolQuery): Promise<any> {
    // Check if a school with the same name already exists
    const existingSchool = await this.adminRepository.getSchoolById(command.schoolId);
    if (!existingSchool) {
      throw new NotFoundError(`School with Id : ${command.schoolId} not found.`);
    }

    const querySchool = command.school;
    const updatedSchool = School.createSchool(querySchool.name);
    updatedSchool.adresse = querySchool.adresse;
    updatedSchool.siteWeb = querySchool.siteWeb;
    updatedSchool.telephone = querySchool.telephone;
    updatedSchool.email = querySchool.email;

    return this.adminRepository.update(command.schoolId, updatedSchool);
  }
}
