import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { GetClassesBySchoolQuery } from "./GetClassesBySchoolQuery";

export class GetClassesBySchoolQueryHandler
  implements IQueryHandler<GetClassesBySchoolQuery, any[]>
{
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetClassesBySchoolQuery): Promise<any[]> {
    return this.schoolRepository.findClassesBySchool(query.schoolId);
  }
}
