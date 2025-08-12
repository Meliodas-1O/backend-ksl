// Assuming your User type and Prisma client are defined like this:

import { PrismaClient } from "../../../generated/prisma";
import { mapPrismaUserToDomain, PrismaAppUser } from "../models/PrismaAppUser";
import { IUserRepository } from "../../../common/domain/repository/IUserRepository";
import { AppUser } from "../../../common/domain/entities/AppUser";

const prisma = new PrismaClient();

export const userPrismaRepository: IUserRepository = {
  async create(user) {
    try {
      const schoolName = user.getSchoolId();

      const rolesRequest = [];

      for (const role of user.getRoles()) {
        rolesRequest.push({
          role: { connect: { name: role } },
        });
      }

      const childrenRequest = [];
      for (const student of user.getChildren()) {
        childrenRequest.push({
          nom: student.nom,
          prenom: student.prenom,
          dateOfBirth: new Date(student.dateOfBirth),
          abscence: 0,
          retards: 0,
          moyenne: 0,
          schoolId: schoolName,
          classeId: student.classe,
        });
      }

      const schoolRequest = {
        connect: { id: user.getSchoolId() },
      };
      const request: any = {
        nom: user.getNom(),
        prenom: user.getPrenom(),
        email: user.getEmail(),
        password: user.getPassword(),
        School: schoolRequest,
        userRoles: { create: rolesRequest },
        //userSchools: schoolRequest,
        children: { create: childrenRequest },
        telephone: user.getTelephone() ?? "",
        profession: user.getProfession() ?? "",
        //classes: x,
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

  async findUserByEmail(email: string): Promise<any> {
    const appUser = await prisma.appUser.findFirst({
      where: { email },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });
    return appUser;
  },

  async findUserByEmailAndSchool(email: string, schoolName: string): Promise<AppUser | null> {
    const appUser: any | null = await prisma.appUser.findFirst({
      where: {
        email,
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

  async findParentsBySchool(schoolId: string): Promise<AppUser[]> {
    throw new Error("Function not implemented.");
  },
  async findClassesBySchool(schoolId: string): Promise<AppUser[]> {
    throw new Error("Function not implemented.");
  },
};
