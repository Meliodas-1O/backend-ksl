import { Teacher } from "../../core/entitites/Teacher";

export interface ITeacherRepository {
  create(professor: Teacher): Promise<void>;
  findById(id: string): Promise<Teacher | null>;
  update(professor: Teacher): Promise<void>;
  delete(id: string): Promise<void>;
}
