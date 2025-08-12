import { School } from "../../../common/domain/entities/School";
import { ISchoolRepository } from "../../../common/domain/repository/ISchoolRepository";
import { PrismaClient } from "../../../generated/prisma";

// Initialize the Prisma client
const prisma = new PrismaClient();

// This is the implementation of your repository interface
export const schoolPrismaRepository: ISchoolRepository = {
  // Generic repository methods
  async create(school: School): Promise<any> {
    return prisma.school.create({
      data: {
        name: school.getName(),
      },
    });
  },

  async update(id: string, school: School): Promise<any> {
    return prisma.school.update({
      where: { id },
      data: {
        name: school.getName(),
      },
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.school.delete({
      where: { id },
    });
  },

  // Specific methods for finding users and classes by school
  async findStudentsBySchool(schoolId: string): Promise<any[]> {
    return prisma.student.findMany({
      where: {
        schoolId: schoolId,
      },
      include: {
        classe: true,
        parent: true,
      },
    });
  },

  async findTeachersBySchool(schoolId: string): Promise<any[]> {
    return prisma.appUser.findMany({
      where: {
        schoolId: schoolId,
        userRoles: {
          some: {
            role: {
              name: "TEACHER",
            },
          },
        },
      },
      include: {
        classes: true,
      },
    });
  },

  async findParentsBySchool(schoolId: string): Promise<any[]> {
    return prisma.appUser.findMany({
      where: {
        schoolId: schoolId,
        userRoles: {
          some: {
            role: {
              name: "PARENT",
            },
          },
        },
      },
      include: {
        children: true, // You can include the children of the parent
      },
    });
  },

  async findAdminsBySchool(schoolId: string): Promise<any[]> {
    return prisma.appUser.findMany({
      where: {
        schoolId: schoolId,
        userRoles: {
          some: {
            role: {
              name: "ADMIN", // Assumes a role named "admin" exists
            },
          },
        },
      },
    });
  },

  async findClassesBySchool(schoolId: string): Promise<any[]> {
    return prisma.classe.findMany({
      where: {
        schoolId: schoolId,
      },
      include: {
        students: true,
        professeurs: {
          include: {
            professeur: true,
          },
        },
        matieres: true,
      },
    });
  },
  getAllSchools: function (): Promise<any[]> {
    return prisma.school.findMany();
  },
  getSchoolById: function (schoolId: string): Promise<any> {
    return prisma.school.findFirst({
      where: {
        id: schoolId,
      },
    });
  },
};
