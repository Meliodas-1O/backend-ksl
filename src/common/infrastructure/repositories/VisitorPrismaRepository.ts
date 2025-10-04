import { PrismaClient } from "@prisma/client";
import { IVisitorRepository } from "../../domain/repository/IVisitorRepository";

const prisma = new PrismaClient();

export const visitorPrismaRepository: IVisitorRepository = {
  async createVisit(userId: string | null, schoolId: string, roles: string, visitorType: string) {
    try {
      const visit = await prisma.visits.create({
        data: {
          userId,
          roles,
          visitTime: new Date(),
          visitorType,
          schoolId,
        },
      });
      console.log("Visit created:", visit);
      return visit;
    } catch (error) {
      console.error("Error creating visit:", error);
      throw new Error("Failed to create visit in database");
    }
  },
  getAllVisits: async function (): Promise<any> {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    return await prisma.visits.findMany({
      where: {
        visitTime: {
          gte: ninetyDaysAgo,
        },
      },
      include: { user: true, School: true },
    });
  },

  deleteOldVisits: async function (): Promise<any> {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    return await prisma.visits.deleteMany({
      where: {
        visitTime: {
          lt: ninetyDaysAgo, // ⬅️ delete visits older than 90 days
        },
      },
    });
  },
};
