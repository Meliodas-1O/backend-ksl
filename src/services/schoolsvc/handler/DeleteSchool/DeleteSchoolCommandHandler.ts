import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { ISchoolRepository } from "../../../../common/domain/repository/ISchoolRepository";
import { DeleteSchoolCommand } from "./DeleteSchoolCommand";

export class DeleteSchoolCommandHandler implements IQueryHandler<DeleteSchoolCommand, any[]> {
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: DeleteSchoolCommand): Promise<any> {
    return this.schoolRepository.delete(query.schoolId);
  }
}
