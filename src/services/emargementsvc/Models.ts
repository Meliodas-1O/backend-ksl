export interface CreateEmargementDto {
  /**
   * The unique identifier for the class.
   */
  classeId: string;

  /**
   * The unique identifier for the discipline (subject) associated with the session.
   */
  disciplineId: string;

  /**
   * The unique identifier for the professor (teacher) conducting the session.
   */
  professeurId: string;

  /**
   * The start date and time of the session in ISO 8601 format.
   */
  debut: Date;

  /**
   * The end date and time of the session in ISO 8601 format.
   */
  fin: Date;

  /**
   * The counter or identifier for this particular session (e.g., the first, second, etc.).
   */
  seanceCounter: number;

  /**
   * The content covered during the class session (e.g., chapters, experiments, etc.).
   */
  content: string;

  /**
   * Additional notes or information about the session (e.g., environment, student attendance).
   */
  additionalInfo: string | undefined;

  /**
   * Id of the school
   */
  schoolId: string;
}
