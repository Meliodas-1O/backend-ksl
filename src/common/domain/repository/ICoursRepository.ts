import { IRepository } from "../contracts/IRepository";
import { Cours } from "../entities/Cours";

/**
 * Defines the contract for interacting with Cours data.
 * This interface ensures a clean separation between application logic and data access.
 */
export interface ICoursRepository extends IRepository<Cours> {
  /**
   * Assign a professor to a specific course.
   * @param coursId The ID of the course.
   * @param professeurId The ID of the professor.
   * @param schoolId The ID of the school.
   * @returns A promise boolean depending on the outcome of the result
   */
  assignProfesseur(coursId: string, professeurId: string, schoolId: string): Promise<boolean>;

  /**
   * Assign a subject (matiere) to a specific course.
   * @param coursId The ID of the course.
   * @param matiereId The ID of the subject.
   * @param schoolId The ID of the school.
   * @returns A promise boolean depending on the outcome of the result
   */
  assignMatiere(coursId: string, matiereId: string, schoolId: string): Promise<boolean>;
  /**
   * Finds all Cours records.
   * @returns A promise that resolves to an array of all Cours.
   */
  findAll(schoolId: string): Promise<Cours[]>;

  /**
   * Finds a Cours by its unique ID.
   * @param coursId The ID of the Cours to find.
   * @returns A promise that resolves to the Cours, or null if not found.
   */
  findById(coursId: string, schoolId: string): Promise<Cours | null>;

  /**
   * Finds all Cours for a specific professor.
   * @param professeurId The ID of the professor.
   * @returns A promise that resolves to an array of Cours.
   */
  findByProfesseur(professeurId: string, schoolId: string): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific Classe.
   * @param classeId The ID of the Classe.
   * @returns A promise that resolves to an array of Cours.
   */
  findByClasse(classeId: string, schoolId: string): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific day.
   * @param day The day of the week (e.g., "Lundi").
   * @returns A promise that resolves to an array of Cours.
   */
  findByDay(day: string, schoolId: string): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific day and hour.
   * @param day The day of the week (e.g., "Lundi").
   * @param hour The hour of the day (e.g., "08:00").
   * @returns A promise that resolves to an array of Cours.
   */
  findByDayAndHour(day: string, hour: string, schoolId: string): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific week (by date range).
   * @param weekStart The start date of the week.
   * @param weekEnd The end date of the week.
   * @returns A promise that resolves to an array of Cours.
   */
  findByWeek(weekStart: Date, weekEnd: Date, schoolId: string): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific professor on a specific day.
   * @param professeurId The ID of the professor.
   * @param day The day of the week (e.g., "Lundi").
   * @returns A promise that resolves to an array of Cours.
   */
  findByProfesseurAndDay(professeurId: string, day: string, schoolId: string): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific professor in a specific week.
   * @param professeurId The ID of the professor.
   * @param weekStart The start date of the week.
   * @param weekEnd The end date of the week.
   * @returns A promise that resolves to an array of Cours.
   */
  findByProfesseurAndWeek(
    professeurId: string,
    weekStart: Date,
    weekEnd: Date,
    schoolId: string
  ): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific Classe on a specific day.
   * @param classeId The ID of the Classe.
   * @param day The day of the week (e.g., "Lundi").
   * @returns A promise that resolves to an array of Cours.
   */
  findByClasseAndDay(classeId: string, day: string, schoolId: string): Promise<Cours[]>;

  /**
   * Finds all Cours for a specific Classe in a specific week.
   * @param classeId The ID of the Classe.
   * @param weekStart The start date of the week.
   * @param weekEnd The end date of the week.
   * @returns A promise that resolves to an array of Cours.
   */
  findByClasseAndWeek(
    classeId: string,
    weekStart: Date,
    weekEnd: Date,
    schoolId: string
  ): Promise<Cours[]>;
}
