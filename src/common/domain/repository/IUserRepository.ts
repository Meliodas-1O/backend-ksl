import { IRepository } from "../contracts/IRepository";
import { AppUser } from "../entities/AppUser";

export interface IUserRepository extends IRepository<AppUser> {
  findUserByEmailAndSchoolName(email: string, schoolName: string): Promise<AppUser | null>;
  findUserByEmailAndSchoolId(email: string, schoolName: string): Promise<AppUser | null>;

  updateParent(id: string, parent: any, schoolId: string): Promise<void>;
  updateTeacher(id: string, teacher: any, schoolId: string): Promise<void>;

  findUserById(id: string): Promise<AppUser | null>;
}
