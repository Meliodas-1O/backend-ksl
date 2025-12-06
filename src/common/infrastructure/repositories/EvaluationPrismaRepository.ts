import { PrismaClient, Evaluation } from "@prisma/client";
import { IEvaluationRepository } from "../../domain/repository/IEvaluationRepository";
import { ICreateEvaluationDTO, IUpdateEvaluationDTO } from "../../domain/entities/Evaluation";

const prisma = new PrismaClient(); // Prisma instance

export const evaluationPrismaRepository: IEvaluationRepository = {
  /**
   * Finds all Evaluation records for a given school.
   * @param schoolId The ID of the school.
   * @returns A promise that resolves to an array of all Evaluations.
   */
  async findAll(schoolId: string): Promise<Evaluation[]> {
    return await prisma.evaluation.findMany({ where: { schoolId } });
  },

  /**
   * Finds a single Evaluation by its unique ID.
   * @param evaluationId The ID of the evaluation to find.
   * @param schoolId The ID of the school.
   * @returns A promise that resolves to the Evaluation, or null if not found.
   */
  async findById(evaluationId: string, schoolId: string): Promise<Evaluation | null> {
    return await prisma.evaluation.findUnique({
      where: { id: evaluationId, schoolId },
    });
  },

  async findByClasse(classeId: string, schoolId: string): Promise<Evaluation[] | null> {
    const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

    return await prisma.evaluation.findMany({
      where: {
        classeId,
        schoolId,
        date: {
          gte: startOfToday,
        },
      },
      include: {
        discipline: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: "asc", // Optional: show upcoming ones first
      },
    });
  },
  async findByTeacher(professeurId, schoolId): Promise<Evaluation[] | null> {
    return await prisma.evaluation.findMany({
      where: {
        professeurId,
        schoolId,
      },
      include: {
        classe: true,
      },
    });
  },

  /**
   * Creates a new Evaluation record.
   * @param data The data for the new evaluation.
   * @returns A promise that resolves to the newly created Evaluation.
   */
  async create(data: Omit<Evaluation, "id" | "createdAt">): Promise<Evaluation> {
    return await prisma.evaluation.create({
      data: {
        type: data.type,
        date: data.date,
        description: data.description,
        title: data.title,
        classeId: data.classeId,
        schoolId: data.schoolId,
        professeurId: data.professeurId,
        disciplineId: data.disciplineId,
      },
    });
  },

  /**
   * Updates an existing Evaluation record.
   * @param evaluationId The ID of the evaluation to update.
   * @param data The data to update.
   * @returns A promise that resolves to the updated Evaluation, or null if not found.
   */
  async update(
    evaluationId: string,
    schoolId: string,
    data: IUpdateEvaluationDTO
  ): Promise<Evaluation | null> {
    return await prisma.evaluation.update({
      where: { id: evaluationId, schoolId },
      data: {
        date: data.date,
        description: data.description,
        title: data.title,
      },
    });
  },

  /**
   * Deletes a Evaluation record by its ID.
   * @param evaluationId The ID of the evaluation to delete.
   * @returns A promise that resolves to the deleted Evaluation, or null if not found.
   */
  async delete(evaluationId: string, schoolId: string): Promise<Evaluation | null> {
    return await prisma.evaluation.delete({
      where: { id: evaluationId, schoolId },
    });
  },
};
