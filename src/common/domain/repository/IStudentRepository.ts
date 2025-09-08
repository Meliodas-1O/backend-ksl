import { IRepository } from "../contracts/IRepository";
import { Student } from "../entities/Student";

export interface IStudentRepository extends IRepository<Student> {
  findStudentBySchool(schoolId: string): Promise<any>;
  findStudentById(id: string): Promise<Student | null>;
  findStudentByClass(classId: string, schoolName: string): Promise<any[]>;

  assignStudentToClass(student: Student, classId: string, schoolId: string): Promise<void>;
  revokeStudentToClass(student: Student, classId: string, schoolId: string): Promise<void>;
}
