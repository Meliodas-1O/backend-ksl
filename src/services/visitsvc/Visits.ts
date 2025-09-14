import { schoolPrismaRepository } from "../../common/infrastructure/repositories/SchoolPrismaRepository";
import { visitorPrismaRepository } from "../../common/infrastructure/repositories/VisitorPrismaRepository";

function validateVisitData(userId: string | null, roles: string, type: string) {
  // Ensure roles and types are one of the accepted values
  const allowedRoles = ["admin", "teacher", "student", "guest"];
  const allowedTypes = ["page_visit", "login", "logout"];

  if (!allowedRoles.includes(roles)) {
    throw new Error(`Invalid role: ${roles}`);
  }

  if (!allowedTypes.includes(type)) {
    throw new Error(`Invalid visit type: ${type}`);
  }

  return { userId, roles, type };
}

// Before calling `createVisit`, validate the data:
const validatedData = validateVisitData(
  "d00ab2ca-e40b-4013-b633-b21f91c80146",
  "admin",
  "page_visit"
);

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
