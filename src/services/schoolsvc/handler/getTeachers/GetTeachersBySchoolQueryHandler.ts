import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { GetTeachersBySchoolQuery } from "./GetTeachersBySchoolQuery";

export class GetTeachersBySchoolQueryHandler
  implements IQueryHandler<GetTeachersBySchoolQuery, any[]>
{
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetTeachersBySchoolQuery): Promise<any[]> {
    return this.schoolRepository.findTeachersBySchool(query.schoolId);
  }
}
