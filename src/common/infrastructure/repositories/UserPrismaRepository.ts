// Assuming your User type and Prisma client are defined like this:

import { PrismaClient } from "@prisma/client";
import { mapPrismaUserToDomain } from "../models/PrismaAppUser";
import { IUserRepository } from "../../../common/domain/repository/IUserRepository";
import { AppUser } from "../../../common/domain/entities/AppUser";

const prisma = new PrismaClient();

export const userPrismaRepository: IUserRepository = {
  async create(user) {
    try {
      const schoolId = user.getSchoolId();
      const rolesRequest: any[] = [];

      for (const role of user.getRoles()) {
        rolesRequest.push({
          role: { connect: { name: role } },
        });
      }

      const childrenRequest: any[] = [];

      for (const student of user.getChildren()) {
        childrenRequest.push({
          nom: student.nom,
          prenom: student.prenom,
          dateOfBirth: new Date(student.dateOfBirth),
          abscence: 0,
          retards: 0,
          moyenne: 0,
          schoolId: schoolId,
          classeId: student.classe,
        });
      }

      const disciplineRequest = {
        connect: user.disciplineIds.map((id) => ({ id })),
      };

      const schoolRequest = {
        connect: { id: schoolId },
      };
      const request: any = {
        nom: user.getNom(),
        prenom: user.getPrenom(),
        email: user.getEmail(),
        password: user.getPassword(),
        School: schoolRequest,
        userRoles: { create: rolesRequest },
        children: { create: childrenRequest },
        telephone: user.getTelephone() ?? "",
        profession: user.getProfession() ?? "",
        disciplines: disciplineRequest,
      };
      const createdUser: any = await prisma.appUser.create({
        data: request,
        include: {
          userRoles: {
            include: { role: true },
          },
          classes: true,
          children: true,
          School: true,
          disciplines: true,
        },
      });
      const domainUser = mapPrismaUserToDomain(createdUser);
      return domainUser;
    } catch (error) {
      console.error("Error creating user in database:", error);
      throw new Error("Failed to create user in database");
    }
  },

  async update(id: string, user) {
    try {
      const rolesRequest = [];
      for (const role of user.getRoles()) {
        // @ts-ignore
        rolesRequest.push({
          role: { connect: { name: role.toLocaleString() } },
        });
      }

      const schoolRequest = {
        create: [{ school: { connect: { name: user.getSchoolId() } } }],
      };

      const updatedUser = await prisma.appUser.update({
        where: { id },
        data: {
          email: user.getEmail(),
          password: user.getPassword(),
          userRoles: {
            deleteMany: {}, // remove all existing roles
            create: rolesRequest,
          },
        },
        include: {
          userRoles: {
            include: { role: true },
          },
        },
      });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user in database:", error);
      throw new Error(`Failed to update user with id ${id} in database`);
    }
  },

  async delete(id) {
    await prisma.appUser.delete({
      where: { id },
    });
  },

  async findUserByEmailAndSchoolName(email: string, schoolName: string): Promise<AppUser | null> {
    const school = await prisma.school.findUnique({
      where: { name: schoolName },
    });

    if (!school) {
      console.error(`School with name ${schoolName} not found`);
      return null;
    }

    const schoolId = school.id;
    const appUser: any | null = await prisma.appUser.findFirst({
      where: {
        email,
        schoolId,
      },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!appUser) {
      console.error(`No user found for email : ${email} and schoolName : ${schoolName}`);
      return null;
    }
    const existingUser = mapPrismaUserToDomain(appUser);
    return existingUser;
  },

  updateParent: async function (id: string, parent: any, schoolId: string): Promise<void> {
    try {
      // Update the parent in the database using Prisma

      await prisma.appUser.update({
        where: {
          id, // The parent's unique ID
        },
        data: {
          nom: parent.nom,
          prenom: parent.prenom,
          email: parent.email,
          telephone: parent.telephone,
          profession: parent.profession,
          schoolId: schoolId, // Ensure the school ID is correctly associated
        },
      });
    } catch (error) {
      console.error("Error updating parent:", error);
      throw new Error("Failed to update parent");
    }
  },

  updateTeacher: async function (id: string, teacher: any, schoolId: string): Promise<void> {
    const request = {
      nom: teacher.nom,
      prenom: teacher.prenom,
      email: teacher.email,
      telephone: teacher.telephone,
      biographie: teacher.biographie ?? "",
    };

    try {
      // Optionally, update teacher's associated classes, if needed
      if (teacher.classes && teacher.classes.length > 0) {
        await prisma.classeProfesseur.deleteMany({
          where: {
            professeurId: id, // Delete existing teacher-class associations
          },
        });
        const teacherClassRequest = teacher.classes.map((c: any) => ({
          professeurId: id,
          classeId: c,
        }));

        await prisma.classeProfesseur.createMany({
          data: teacherClassRequest,
        });
      }

      await prisma.appUser.update({
        where: {
          id,
          schoolId,
        },
        data: request,
      });
    } catch (error) {
      console.error("Error updating teacher:", error);
      throw new Error("Failed to update teacher");
    }
  },
  findUserById: async function (id: string): Promise<AppUser | null> {
    const appUser: any | null = await prisma.appUser.findFirst({
      where: {
        id,
      },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });
    const existingUser: AppUser = mapPrismaUserToDomain(appUser);
    return existingUser;
  },
  findUserByEmailAndSchoolId: async function (
    email: string,
    schoolId: string
  ): Promise<AppUser | null> {
    const appUser: any | null = await prisma.appUser.findFirst({
      where: {
        email,
        schoolId,
      },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!appUser) {
      console.error(`No user found for email : ${email} and schoolId : ${schoolId}`);
      return null;
    }
    const existingUser = mapPrismaUserToDomain(appUser);
    return existingUser;
  },
  findUserByPhoneNumberAndSchoolName: async function (
    phone: string,
    schoolName: string
  ): Promise<AppUser | null> {
    const school = await prisma.school.findUnique({
      where: { name: schoolName },
    });

    if (!school) {
      console.error(`School with name ${schoolName} not found`);
      return null;
    }

    const schoolId = school.id;
    const appUser: any | null = await prisma.appUser.findFirst({
      where: {
        telephone: phone,
        schoolId,
      },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!appUser) {
      console.error(`No user found for phone : ${phone} and schoolName : ${schoolName}`);
      return null;
    }
    const existingUser = mapPrismaUserToDomain(appUser);
    return existingUser;
  },
};
