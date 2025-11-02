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
      },
    });
    return true;
  },

  async deleteEmargementById(emargementId: string, schoolId: string): Promise<void> {
    await prisma.emargement.delete({
      where: { id: emargementId, schoolId },
    });
  },

  async updateEmargementById(
    emargement: any,
    emargementId: string,
    schoolId: string
  ): Promise<void> {
    await prisma.emargement.update({
      where: { id: emargementId, schoolId },
      data: {
        content: emargement.content,
        debut: emargement.debut,
        fin: emargement.fin,
        seanceCounter: emargement.seanceCounter,
        additionalInfo: emargement.additionalInfo,
        discipline: {
          connect: {
            id: emargement.disciplineId,
          },
        },
        classe: {
          connect: {
            id: emargement.classeId,
          },
        },
      },
    });
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
};
