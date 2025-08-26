import { IRepository } from "../contracts/IRepository";
import { AppUser } from "../entities/AppUser";

export interface IUserRepository extends IRepository<AppUser> {
  findUserByEmail(email: string): Promise<any>;
  findUserByEmailAndSchool(email: string, schoolName: string): Promise<AppUser | null>;

  updateParent(id: string, parent: any, schoolId: string): Promise<void>;
  updateTeacher(id: string, teacher: any, schoolId: string): Promise<void>;
}
