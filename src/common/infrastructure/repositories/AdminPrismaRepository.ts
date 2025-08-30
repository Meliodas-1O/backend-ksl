import { Admin } from "../../..//common/domain/entities/Admin";
import { RoleEntity } from "../../..//common/domain/entities/RoleEntity";
import { IAdminRepository } from "../../..//common/domain/repository/IAdminRepository";
import { PrismaClient } from "../../../generated/prisma";
import { School } from "../../../common/domain/entities/School";

const prisma = new PrismaClient();

export const adminPrismaRepository: IAdminRepository = {
  createRole: async function (role: RoleEntity): Promise<any> {
    return await prisma.role.create({ data: role });
  },
  findAllRoles: async function (): Promise<any[]> {
    return await prisma.role.findMany();
  },
  findRoleByName: async function (name: string): Promise<any | null> {
    return await prisma.role.findUnique({ where: { name } });
  },
  createSchool: async function (school: School): Promise<any> {
    return await prisma.school.create({
      data: {
        name: school.getName(),
      },
    });
  },
  deleteSchool: async function (schoolId: string): Promise<void> {
    await prisma.school.delete({ where: { id: schoolId } });
  },
  createAdmin: async function (admin: Admin): Promise<any> {
    return await prisma.appUser.create({
      data: {
        nom: admin.getLastName(),
        prenom: admin.getFirstName(),
        email: admin.getEmail(),
        password: admin.getPassword(),
        schoolId: admin.getSchoolId(),
      },
    });
  },
  deleteAdmin: async function (
    adminId: string,
    schoolId: string
  ): Promise<void> {
    await prisma.appUser.deleteMany({ where: { id: adminId, schoolId } });
  },
  assignRoleToUser: async function (
    userId: string,
    roleId: string
  ): Promise<any> {
    return await prisma.userRole.create({ data: { userId, roleId } });
  },
  removeRoleFromUser: async function (
    userId: string,
    roleId: string
  ): Promise<any> {
    return await prisma.userRole.deleteMany({ where: { userId, roleId } });
  },
  findSchoolWithName: async function (name: string): Promise<any | null> {
    return await prisma.school.findUnique({ where: { name } });
  },
  createDiscipline: async function (name: string): Promise<any> {
    const existingDiscipline = await prisma.discipline.findUnique({
      where: { name },
    });

    return !!existingDiscipline
      ? existingDiscipline
      : await prisma.discipline.create({ data: { name } });
  },
};
