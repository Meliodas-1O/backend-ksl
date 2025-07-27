import { IQueryHandler } from "../../../../../common/domain/contracts/IQueryHandler";
import { IStudentRepository } from "../../../../../common/domain/repository/IStudentRepository";
import { Student } from "../../../../../common/domain/entities/Student";
import { GetStudentsByIdQuery } from "./GetStudentsByIdQuery";

export class GetStudentsByIdQueryHandler
  implements IQueryHandler<GetStudentsByIdQuery, Student | null>
{
  constructor(private repository: IStudentRepository) {}

  async execute(query: GetStudentsByIdQuery): Promise<Student | null> {
    return this.repository.findStudentById(query.schoolId);
  }
}
