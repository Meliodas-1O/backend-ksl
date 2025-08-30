import { Admin } from "../../domain/entities/Admin";
import { RoleEntity } from "../../domain/entities/RoleEntity";
import { School } from "../../domain/entities/School";

export interface IAdminRepository {
  createRole(role: RoleEntity): Promise<any>;
  findAllRoles(): Promise<any[]>;
  findRoleByName(name: string): Promise<any | null>;
  createSchool(school: School): Promise<any>;
  deleteSchool(schoolId: string): Promise<void>;
  createAdmin(admin: Admin): Promise<any>;
  deleteAdmin(adminId: string, schoolId: string): Promise<void>;
  assignRoleToUser(userId: string, roleId: string): Promise<any>;
  removeRoleFromUser(userId: string, roleId: string): Promise<any>;
  findSchoolWithName(name: string): Promise<any | null>;
  createDiscipline(name: string): Promise<any>;
}
