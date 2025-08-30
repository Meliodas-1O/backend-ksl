import { School } from "../../../../common/domain/entities/School";
import { GetAllSchoolsQuery } from "./GetAllSchoolsQuery";
import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";

export class GetAllSchoolsQueryHandler
  implements IQueryHandler<GetAllSchoolsQuery, School[]>
{
  constructor(public schoolRepository: ISchoolRepository) {}

  async execute(command: GetAllSchoolsQuery): Promise<School[]> {
    return await this.schoolRepository.getAllSchools();
  }
}
