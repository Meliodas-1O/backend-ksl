import { Visits } from "@prisma/client";
import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { IVisitorRepository } from "../../common/domain/repository/IVisitorRepository";
import { GetStudentsBySchoolQuery } from "../studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQuery";
import { GetAllVisitsQuery } from "./GetAllVisitsQuery";

export class GetAllVisitsQueryHandler implements IQueryHandler<GetAllVisitsQuery, any[]> {
  constructor(private repository: IVisitorRepository) {}

  async execute(query: GetStudentsBySchoolQuery): Promise<Visits[]> {
    return await this.repository.getAllVisits();
  }
}
