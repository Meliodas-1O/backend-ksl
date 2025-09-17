import { schoolPrismaRepository } from "../../common/infrastructure/repositories/SchoolPrismaRepository";
import { visitorPrismaRepository } from "../../common/infrastructure/repositories/VisitorPrismaRepository";

async function createVisit(userId: string | null, role: string, schoolIdOrName: string) {
  const isAuthenticated = Boolean(userId);
  const type = isAuthenticated ? "AUTHENTICATED" : "GUEST";

  // If authenticated, assume schoolId is valid and proceed
  if (isAuthenticated) {
    return visitorPrismaRepository.createVisit(userId, schoolIdOrName, role, type);
  }

  // If guest, we need to resolve school by name
  const school = await schoolPrismaRepository.getSchoolByName(schoolIdOrName);
  if (!school) return;

  return visitorPrismaRepository.createVisit(null, school.id, role, type);
}

export const VisitService = {
  createVisit,
};
