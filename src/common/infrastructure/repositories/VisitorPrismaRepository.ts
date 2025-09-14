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
};
