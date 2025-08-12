import { Student } from "../../../../common/domain/entities/Student";
import { GetParentsBySchoolQuery } from "./GetParentsBySchoolQuery";
import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";

export class GetParentsBySchoolQueryHandler
  implements IQueryHandler<GetParentsBySchoolQuery, Student[]>
{
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetParentsBySchoolQuery): Promise<Student[]> {
    return this.schoolRepository.findParentsBySchool(query.schoolId);
  }
}
