import { IRepository } from "../contracts/IRepository";
import { School } from "../entities/School";

export interface ISchoolRepository extends IRepository<School> {
  findStudentsBySchool(schoolId: string): Promise<any[]>;
  findTeachersBySchool(schoolId: string): Promise<any[]>;
  findParentsBySchool(schoolId: string): Promise<any[]>;
  findAdminsBySchool(schoolId: string): Promise<any[]>;
  findClassesBySchool(schoolId: string): Promise<any[]>;
  getAllSchools(): Promise<any[]>;
  getSchoolById(schoolId: string): Promise<any[]>;
}
