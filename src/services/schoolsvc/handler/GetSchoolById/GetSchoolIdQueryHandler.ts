import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { GetSchoolByIdQuery } from "./GetSchoolByIdQuery";
import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";

export class GetSchoolByIdQueryHandler implements IQueryHandler<GetSchoolByIdQuery, any> {
  constructor(private repository: ISchoolRepository) {}

  async execute(query: GetSchoolByIdQuery): Promise<any> {
    return this.repository.getSchoolById(query.schoolId);
  }
}
