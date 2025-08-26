import { Student } from "common/domain/entities/Student";
import { IStudentRepository } from "../../../common/domain/repository/IStudentRepository";
import { PrismaClient } from "../../../generated/prisma";
import { MapPrismaStudentToDomain } from "../models/PrismaStudent";

const prisma = new PrismaClient();
export const studentPrismaRepository: IStudentRepository = {
  findStudentBySchool: function (schoolId: string): Promise<any> {
    return prisma.student.findMany({
      where: { schoolId },
      include: { parent: true, classe: true },
    });
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
    const data: any = {
      nom: entity.getNom(),
      prenom: entity.getPrenom(),
      dateOfBirth: entity.getDateOfBirth(),
      abscence: entity.getAbscence(),
      retards: entity.getRetards(),
      moyenne: entity.getMoyenne(),
      classeId: entity.classe,
      schoolId: entity.schoolId,
    };

    if (entity.parentId) {
      data.parentId = entity.parentId;
    }

    try {
      console.log("Data", data);
      const student = await prisma.student.create({
        data,
        include: { parent: true, classe: true },
      });
      return MapPrismaStudentToDomain(student);
    } catch (error) {
      console.error("Failed to create student:", error);
      throw error;
    }
  },
  update: async function (id: string, entity: Student): Promise<any> {
    try {
      const request: any = {
        nom: entity.getNom(),
        prenom: entity.getPrenom(),
        dateOfBirth: entity.getDateOfBirth(),
        abscence: entity.getAbscence(),
        retards: entity.getRetards(),
        moyenne: entity.getMoyenne(),
      };
      if (entity.parentId != "") {
        request.parentId = entity.parentId;
      }

      if (entity.classe != "") {
        request.classeId = entity.classe;
      }
      console.log("req", request);
      const updated = await prisma.student.update({
        where: { id, schoolId: entity.schoolId },
        include: { parent: true, classe: true },
        data: request,
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
    return prisma.student.findFirst({ where: { id }, include: { parent: true, classe: true } });
  },
};
