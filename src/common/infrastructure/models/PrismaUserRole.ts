import { PrismaRole } from "./PrismaRole";

export type PrismaUserRole = {
  userId: string;
  roleId: string;
  role: PrismaRole;
};
