import { ITeacherRepository } from "../../../core/interfaces/ITeacherRepository";

export class GetTeacher {
  constructor(private repo: ITeacherRepository) {}
  async execute(id: string) {
    return this.repo.findById(id);
  }
}
