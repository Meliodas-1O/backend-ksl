import { Student } from "common/domain/entities/Student";
import { IStudentRepository } from "../../../common/domain/repository/IStudentRepository";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();
export const studentPrismaRepository: IStudentRepository = {
  findStudentBySchool: function (schoolId: string): Promise<any> {
    return prisma.student.findMany({ where: { schoolId } });
  },
  findStudentByClass: function (classId: string, schoolName: string): Promise<Student | null> {
    throw new Error("Function not implemented.");
  },
  assignStudentToClass: function (
    student: Student,
    classId: string,
    schoolId: string
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
  revokeStudentToClass: function (
    student: Student,
    classId: string,
    schoolId: string
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
  create: async function (entity: Student): Promise<any> {
    try {
      const student = await prisma.student.create({
        data: {
          nom: entity.getNom(),
          prenom: entity.getPrenom(),
          dateOfBirth: entity.getDateOfBirth(),
          abscence: entity.getAbscence(),
          retards: entity.getRetards(),
          moyenne: entity.getMoyenne(),
          //schoolId: entity.schoolId,
        },
      });
      return student;
    } catch (error) {
      console.error("Failed to create student:", error);
      throw error;
    }
  },
  update: async function (id: string, entity: Student): Promise<any> {
    console.log("je suis id : ", id);
    console.log("Je suis students : ", entity);
    try {
      const updated = await prisma.student.update({
        where: { id },
        data: {
          nom: entity.getNom(),
          prenom: entity.getPrenom(),
          dateOfBirth: entity.getDateOfBirth(),
          abscence: entity.getAbscence(),
          retards: entity.getRetards(),
          moyenne: entity.getMoyenne(),
          schoolId: entity.schoolId,
          //classe: entity.classe,
        },
      });
      return updated;
    } catch (error) {
      console.error("Failed to update student:", error);
      throw error;
    }
  },
  delete: async function (id: string): Promise<void> {
    try {
      await prisma.student.delete({ where: { id } });
    } catch (error) {
      console.error("Failed to delete student:", error);
      throw error;
    }
  },
  findStudentById: async function (id: string): Promise<any | null> {
    return prisma.student.findFirst({ where: { id } });
  },
};
