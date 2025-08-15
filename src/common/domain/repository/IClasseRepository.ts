import { IRepository } from "../contracts/IRepository";
import { AppUser } from "../entities/AppUser";
import { Classe } from "../entities/Classe";
import { Discipline } from "../entities/Discipline";
import { Student } from "../entities/Student";

/**
 * Defines the contract for interacting with Classe data.
 * This interface ensures a clean separation between application logic and data access.
 */
export interface IClasseRepository extends IRepository<Classe> {
  /**
   * Finds all Classe records.
   * @returns A promise that resolves to an array of all Classes.
   */
  findAll(schoolId: string): Promise<Classe[]>;

  /**
   * Finds a Classe by its unique ID.
   * @param classeId The ID of the classe to find.
   * @returns A promise that resolves to the Classe, or null if not found.
   */
  findById(classeId: string, schoolId: string): Promise<Classe | null>;

  /**
   * Finds all Students enrolled in a specific Classe.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of Students.
   */
  findStudentsByClasse(classeId: string, schoolId: string): Promise<Student[]>;

  /**
   * Finds all Professors teaching a specific Classe.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of AppUser (professors).
   */
  findProfessorsByClasse(classeId: string, schoolId: string): Promise<AppUser[]>;

  /**
   * Finds all Parents of students in a specific Classe.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of AppUser (parents).
   */
  findParentsByClasse(classeId: string, schoolId: string): Promise<AppUser[]>;

  /**
   * Finds all Matières taught in a specific Classe.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of Disciplines.
   */
  findDisciplinesByClasse(classeId: string, schoolId: string): Promise<Discipline[]>;

  /**
   * Assigns a professor to a classe using the join table.
   * @param classeId The ID of the classe.
   * @param professeurId The ID of the professor.
   * @returns A promise that resolves to the updated Classe.
   */
  assignProfesseur(classeId: string, professeurId: string, schoolId: string): Promise<Classe>;

  /**
   * Assigns a matiere (subject) to a classe.
   * @param classeId The ID of the classe.
   * @param matiereId The ID of the matiere.
   * @returns A promise that resolves to the updated Classe.
   */
  assignMatiere(classeId: string, matiereId: string, schoolId: string): Promise<Classe>;
}
