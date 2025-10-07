import { PrismaClient } from "@prisma/client";
import { IEmargementRepository } from "../../domain/repository/IEmargementRepository";

const prisma = new PrismaClient();

export const emargementPrismaRepository: IEmargementRepository = {
  async createEmargement(emargement: any): Promise<any> {
    await prisma.emargement.create({
      data: {
        content: emargement.content,
        debut: emargement.debut,
        fin: emargement.fin,
        seanceCounter: emargement.seanceCounter,
        additionalInfo: emargement.additionalInfo,
        classe: {
          connect: {
            id: emargement.classeId,
          },
        },
        School: {
          connect: {
            id: emargement.schoolId,
          },
        },
        professeur: {
          connect: {
            id: emargement.professeurId,
          },
        },
        discipline: {
          connect: {
            id: emargement.disciplineId,
          },
        },
        // classeId: emargement.classeId,
        // disciplineId: emargement.disciplineId,
        // professeurId: emargement.professeurId,
        // schoolId: emargement.schoolId,
      },
    });
    return true;
  },
  async getAllEmargements(schoolId: string): Promise<any[]> {
    return await prisma.emargement.findMany({
      where: { schoolId },
      include: {
        classe: {
          select: {
            id: true,
            nom: true,
            niveau: true,
          },
        },
        discipline: true,
        professeur: {
          select: {
            id: true,
            prenom: true,
            nom: true,
          },
        },
      },
    });
  },
  async getEmargementById(emargementId: string, schoolId: string): Promise<any | null> {
    return await prisma.emargement.findUnique({
      where: { id: emargementId, schoolId },
    });
  },
  async getEmargementByUserId(professeurId: string, schoolId: string): Promise<any[]> {
    return await prisma.emargement.findMany({
      where: { professeurId, schoolId },
    });
  },
};
