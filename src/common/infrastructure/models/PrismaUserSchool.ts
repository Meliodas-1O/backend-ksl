import { PrismaSchool } from "./PrismaSchool";

export type PrismaUserSchool = {
  userId: string;
  schoolId: string | null;
  school: PrismaSchool;
};
