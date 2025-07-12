import { ITeacherRepository } from "../../../core/interfaces/ITeacherRepository";

export class AddClassToTeacher {
  constructor(private repo: ITeacherRepository) {}

  async execute(professorId: string, classId: string): Promise<void> {
    const prof = await this.repo.findById(professorId);
    if (!prof) throw new Error("Teacher not found");

    if (!prof.classroomIds.includes(classId)) {
      prof.classroomIds.push(classId);
    }

    await this.repo.update(prof);
  }
}
