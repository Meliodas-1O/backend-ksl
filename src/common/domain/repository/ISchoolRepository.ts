import { IRepository } from "../contracts/IRepository";
import { School } from "../entities/School";

export interface ISchoolRepository extends IRepository<School> {
  /**
   * Retrieves all students associated with a specific school.
   * @param schoolId The ID of the school.
   */
  findStudentsBySchool(schoolId: string): Promise<any[]>;

  /**
   * Retrieves all teachers associated with a specific school.
   * @param schoolId The ID of the school.
   */
  findTeachersBySchool(schoolId: string): Promise<any[]>;

  /**
   * Retrieves all parents associated with a specific school.
   * @param schoolId The ID of the school.
   */
  findParentsBySchool(schoolId: string): Promise<any[]>;

  /**
   * Retrieves all administrators associated with a specific school.
   * @param schoolId The ID of the school.
   */
  findAdminsBySchool(schoolId: string): Promise<any[]>;

  /**
   * Retrieves all classes associated with a specific school.
   * @param schoolId The ID of the school.
   */
  findClassesBySchool(schoolId: string): Promise<any[]>;

  /**
   * Retrieves all schools.
   */
  getAllSchools(): Promise<any[]>;

  /**
   * Retrieves a specific school by its ID.
   * @param schoolId The ID of the school.
   */
  getSchoolById(schoolId: string): Promise<any>;

  /**
   * Retrieves a specific school by its ID.
   * @param schoolName The ID of the school.
   */
  getSchoolByName(schoolName: string): Promise<any>;

  /**
   * Retrieves a specific student by ID and school.
   * @param studentId The ID of the student.
   * @param schoolId The ID of the school.
   */
  findStudentById(studentId: string, schoolId: string): Promise<any | null>;

  /**
   * Retrieves a specific teacher by ID and school.
   * @param teacherId The ID of the teacher.
   * @param schoolId The ID of the school.
   */
  findTeacherById(teacherId: string, schoolId: string): Promise<any | null>;

  /**
   * Retrieves a specific parent by ID and school.
   * @param parentId The ID of the parent.
   * @param schoolId The ID of the school.
   */
  findParentById(parentId: string, schoolId: string): Promise<any | null>;

  /**
   * Retrieves a specific class by ID and school.
   * @param classeId The ID of the class.
   * @param schoolId The ID of the school.
   */
  findClasseById(classeId: string, schoolId: string): Promise<any | null>;

  updateSchoolReportGeneratedCounter(counter: number, schoolId: string): Promise<void>;
  updateStudentReportGeneratedCounter(counter: number, schoolId: string): Promise<void>;
}
