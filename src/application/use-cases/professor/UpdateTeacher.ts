import { Teacher } from "../../../core/entitites/Teacher";
import { ITeacherRepository } from "../../../core/interfaces/ITeacherRepository";

export class UpdateTeacher {
  constructor(private repo: ITeacherRepository) {}

  async execute(id: string, data: Partial<Teacher>): Promise<void> {
    const prof = await this.repo.findById(id);
    if (!prof) throw new Error("Teacher not found");

    const updated = Object.assign(prof, data);
    await this.repo.update(updated);
  }
}
