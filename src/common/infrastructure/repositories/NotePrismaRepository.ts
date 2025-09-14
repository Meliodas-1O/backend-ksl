import { Note, PrismaClient } from "@prisma/client";
import { INoteRepository } from "../../domain/repository/INoteRepository";

/**
 ** Concrete implementation of the INoteRepository using Prisma.
 */
const prisma = new PrismaClient(); // Prisma instance

export const NotePrismaRepository: INoteRepository = {
  async create(data: Omit<Note, "id" | "createdAt">): Promise<Note> {
    return await prisma.note.create({ data });
  },

  async update(id: string, data: Partial<Note>): Promise<Note> {
    return await prisma.note.update({ where: { id, schoolId: data.schoolId }, data });
  },

  async delete(id: string, schoolId: string): Promise<Note> {
    return await prisma.note.delete({ where: { id, schoolId } });
  },

  async findById(id: string, schoolId: string): Promise<Note | null> {
    return await prisma.note.findUnique({ where: { id, schoolId }, include: { discipline: true } });
  },

  async findByStudentId(studentId: string, schoolId: string): Promise<any[]> {
    return await prisma.note.findMany({
      where: { studentId, schoolId },
      include: { discipline: true },
    });
  },

  async findByClasseId(classeId: string, schoolId: string): Promise<Note[]> {
    return await prisma.note.findMany({
      where: { classeId, schoolId },
      include: { discipline: true },
    });
  },

  async findByDisciplineId(disciplineId: string, schoolId: string): Promise<Note[]> {
    return await prisma.note.findMany({
      where: { disciplineId, schoolId },
      include: { discipline: true },
    });
  },
  findByTeacherId: async function (professeurId: string, schoolId: string): Promise<Note[]> {
    return await prisma.note.findMany({
      where: { professeurId, schoolId },
      include: {
        discipline: true,
        classe: { select: { id: true, niveau: true, nom: true } },
        student: { select: { id: true, nom: true, prenom: true } },
      },
    });
  },
  findBySchoolId: async function (schoolId: string): Promise<Note[]> {
    return await prisma.note.findMany({ where: { schoolId }, include: { discipline: true } });
  },
};
