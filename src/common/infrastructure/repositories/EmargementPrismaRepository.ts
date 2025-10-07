import { PrismaClient } from "@prisma/client";
import { IEmargementRepository } from "../../domain/repository/IEmargementRepository";

const prisma = new PrismaClient();

export const emargementPrismaRepository: IEmargementRepository = {
  async createEmargement(emargement: any): Promise<any> {
    return await prisma.emargement.create({
      data: emargement,
    });
  },
  async getAllEmargements(schoolId: string): Promise<any[]> {
    return await prisma.emargement.findMany({
      where: { schoolId },
    });
  },
  async getEmargementById(
    emargementId: string,
    schoolId: string
  ): Promise<any | null> {
    return await prisma.emargement.findUnique({
      where: { id: emargementId, schoolId },
    });
  },
  async getEmargementByUserId(
    professeurId: string,
    schoolId: string
  ): Promise<any[]> {
    return await prisma.emargement.findMany({
      where: { professeurId, schoolId },
    });
  },
};
