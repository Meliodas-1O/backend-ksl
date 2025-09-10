import { IQueryHandler } from "../../../common/domain/contracts/IQueryHandler";
import { ISchoolRepository } from "../../../common/domain/repository/ISchoolRepository";
import { enrichChildrenWithStats } from "./ProcessParentData";

import {
  GetStudentByIdQuery,
  GetTeacherByIdQuery,
  GetParentByIdQuery,
  GetOneClasseByIdQuery,
} from "./SchoolQueries";

export class GetStudentByIdQueryHandler implements IQueryHandler<GetStudentByIdQuery, any | null> {
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetStudentByIdQuery): Promise<any | null> {
    return await this.schoolRepository.findStudentById(query.studentId, query.schoolId);
  }
}

export class GetTeacherByIdQueryHandler implements IQueryHandler<GetTeacherByIdQuery, any | null> {
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetTeacherByIdQuery): Promise<any | null> {
    return await this.schoolRepository.findTeacherById(query.teacherId, query.schoolId);
  }
}

export class GetParentByIdQueryHandler implements IQueryHandler<GetParentByIdQuery, any | null> {
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetParentByIdQuery): Promise<any | null> {
    const parentData = await this.schoolRepository.findParentById(query.parentId, query.schoolId);
    return enrichChildrenWithStats(parentData);
  }
}

export class GetOneClasseByIdQueryHandler
  implements IQueryHandler<GetOneClasseByIdQuery, any | null>
{
  constructor(private schoolRepository: ISchoolRepository) {}

  async execute(query: GetOneClasseByIdQuery): Promise<any | null> {
    return await this.schoolRepository.findClasseById(query.classeId, query.schoolId);
  }
}
