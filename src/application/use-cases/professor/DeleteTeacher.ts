import { ITeacherRepository } from "../../../core/interfaces/ITeacherRepository";

export class DeleteTeacher {
  constructor(private repo: ITeacherRepository) {}
  async execute(id: string) {
    await this.repo.delete(id);
  }
}
