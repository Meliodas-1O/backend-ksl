import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { GetAdminsBySchoolQuery } from "./GetAdminsBySchoolQuery";

export class GetAdminsBySchoolQueryHandler implements IQueryHandler<GetAdminsBySchoolQuery, any[]> {
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetAdminsBySchoolQuery): Promise<any[]> {
    return this.schoolRepository.findClassesBySchool(query.schoolId);
  }
}
