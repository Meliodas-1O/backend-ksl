import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { IStudentRepository } from "../../../../common/domain/repository/IStudentRepository";
import { Student } from "../../../../common/domain/entities/Student";
import { GetStudentBySchoolQuery } from "./GetStudentBySchoolQuery";

export class GetStudentBySchoolQueryHandler
  implements IQueryHandler<GetStudentBySchoolQuery, Student[]>
{
  constructor(private repository: IStudentRepository) {}

  async execute(query: GetStudentBySchoolQuery): Promise<Student[]> {
    return this.repository.findStudentBySchool(query.schoolId);
  }
}
