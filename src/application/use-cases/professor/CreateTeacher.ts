// application/use-cases/professor/CreateTeacher.ts
import { Teacher } from "../../../core/entitites/Teacher";
import { CreateTeacherRequest } from "../../../application/dto/teacher/CreateTeacherRequest";
import { ITeacherRepository } from "../../../core/interfaces/ITeacherRepository";
import { v4 as uuid } from "uuid";

export class CreateTeacher {
  constructor(private repo: ITeacherRepository) {}

  async execute(data: CreateTeacherRequest): Promise<string> {
    const professor = new Teacher(
      uuid(),
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      data.address,
      data.biography,
      data.subject
    );
    await this.repo.create(professor);
    return professor.id;
  }
}
