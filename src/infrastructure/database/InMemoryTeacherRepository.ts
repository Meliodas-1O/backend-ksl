import { Teacher } from "@core/entitites/Teacher";
import { ITeacherRepository } from "@core/interfaces/ITeacherRepository";

export class InMemoryTeacherRepository implements ITeacherRepository {
  private professors = new Map<string, Teacher>();

  async create(professor: Teacher): Promise<void> {
    this.professors.set(professor.id, professor);
  }

  async findById(id: string): Promise<Teacher | null> {
    return this.professors.get(id) ?? null;
  }

  async update(professor: Teacher): Promise<void> {
    this.professors.set(professor.id, professor);
  }

  async delete(id: string): Promise<void> {
    this.professors.delete(id);
  }
}
