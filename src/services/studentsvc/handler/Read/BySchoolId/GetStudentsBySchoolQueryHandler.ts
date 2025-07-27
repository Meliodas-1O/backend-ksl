import { IQueryHandler } from "../../../../../common/domain/contracts/IQueryHandler";
import { IStudentRepository } from "../../../../../common/domain/repository/IStudentRepository";
import { GetStudentsBySchoolQuery } from "./GetStudentsBySchoolQuery";
import { Student } from "../../../../../common/domain/entities/Student";

export class GetStudentsBySchoolQueryHandler
  implements IQueryHandler<GetStudentsBySchoolQuery, Student[]>
{
  constructor(private repository: IStudentRepository) {}

  async execute(query: GetStudentsBySchoolQuery): Promise<Student[]> {
    return this.repository.findStudentBySchool(query.schoolId);
  }
}
