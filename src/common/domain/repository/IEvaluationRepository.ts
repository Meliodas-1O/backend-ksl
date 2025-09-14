import { Evaluation } from "@prisma/client";
import { ICreateEvaluationDTO, IUpdateEvaluationDTO } from "../entities/Evaluation";

export interface IEvaluationRepository {
  /**
   * Get all evaluations for a specific school.
   */
  findAll(schoolId: string): Promise<Evaluation[]>;

  /**
   * Get a specific evaluation by ID and school.
   */
  findById(evaluationId: string, schoolId: string): Promise<Evaluation | null>;

  /**
   * Get all evaluations by class.
   */
  findByClasse(classeId: string, schoolId: string): Promise<Evaluation[] | null>;

  /**
   * Get all evaluations by teacher.
   */
  findByTeacher(professeurId: string, schoolId: string): Promise<Evaluation[] | null>;

  /**
   * Create a new evaluation.
   */
  create(data: ICreateEvaluationDTO): Promise<Evaluation>;

  /**
   * Update an existing evaluation.
   */
  update(
    evaluationId: string,
    schoolId: string,
    data: IUpdateEvaluationDTO
  ): Promise<Evaluation | null>;

  /**
   * Delete an evaluation.
   */
  delete(evaluationId: string, schoolId: string): Promise<Evaluation | null>;
}
