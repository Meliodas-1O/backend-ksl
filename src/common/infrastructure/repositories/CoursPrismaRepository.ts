import { PrismaClient } from "../../../generated/prisma";
import { Cours } from "../../domain/entities/Cours"; // Cours entity
import { ICoursRepository } from "../../domain/repository/ICoursRepository";

const prisma = new PrismaClient(); // Prisma instance

export const coursPrismaRepository: ICoursRepository = {
  /**
   * Assign a professor to a specific course.
   * @param coursId The ID of the course.
   * @param professeurId The ID of the professor.
   * @param schoolId The ID of the school.
   * @returns A promise that resolves to the updated course.
   */
  async assignProfesseur(
    coursId: string,
    professeurId: string,
    schoolId: string
  ): Promise<boolean> {
    // First, check if the course exists
    const cours = await prisma.cours.findUnique({
      where: { id: coursId, schoolId },
      include: { professeur: true }, // Assuming you want to include professors in the response
    });

    if (!cours) {
      throw new Error("Course not found");
    }

    // Link the professor to the course (assuming there's a join table or relation in Prisma)
    const updatedCours = await prisma.cours.update({
      where: { id: coursId },
      data: {
        professeur: {
          connect: { id: professeurId }, // Connect professor to course
        },
      },
    });

    return !!updatedCours;
  },

  /**
   * Assign a subject (matiere) to a specific course.
   * @param coursId The ID of the course.
   * @param matiereId The ID of the subject.
   * @param schoolId The ID of the school.
   * @returns A promise that resolves to the updated course.
   */
  async assignMatiere(
    coursId: string,
    matiereId: string,
    schoolId: string
  ): Promise<boolean> {
    // First, check if the course exists
    const cours = await prisma.cours.findUnique({
      where: { id: coursId, schoolId },
      include: { discipline: true }, // Assuming courses have disciplines (subjects)
    });

    if (!cours) {
      throw new Error("Course not found");
    }

    // Link the subject (matiere) to the course
    const updatedCours = await prisma.cours.update({
      where: { id: coursId },
      data: {
        discipline: {
          connect: { id: matiereId }, // Connect subject to course
        },
      },
    });
    return !!updatedCours;
  },
  // Update an existing course
  async update(id: string, entity: Cours): Promise<Cours> {
    const updatedCourse = await prisma.cours.update({
      where: { id: id, schoolId: entity.getSchoolId() },
      data: {
        jour: entity.getJour(),
        heure: entity.getHeure(),
        disciplineId: entity.getDisciplineId(),
        professeurId: entity.getProfesseurId(),
        classeId: entity.getClasseId(),
      },
    });

    // Fetch related entities (discipline, professeur, classe)
    const discipline = await prisma.discipline.findUnique({
      where: { id: updatedCourse.disciplineId },
    });

    const professeur = await prisma.appUser.findUnique({
      where: { id: updatedCourse.professeurId },
    });

    const classe = await prisma.classe.findUnique({
      where: { id: updatedCourse.classeId },
    });

    return Cours.MapToDomain(
      updatedCourse.jour,
      updatedCourse.heure,
      updatedCourse.disciplineId,
      updatedCourse.professeurId,
      updatedCourse.classeId,
      updatedCourse.schoolId,
      updatedCourse.id,
      discipline!,
      professeur!,
      classe!
    );
  },

  // Delete a course by its ID
  async delete(id: string): Promise<void> {
    await prisma.cours.delete({
      where: { id: id },
    });
  },

  // Create a new course
  async create(entity: Cours): Promise<Cours> {
    const newCourse = await prisma.cours.create({
      data: {
        jour: entity.getJour(),
        heure: entity.getHeure(),
        disciplineId: entity.getDisciplineId(),
        professeurId: entity.getProfesseurId(),
        classeId: entity.getClasseId(),
        schoolId: entity.getSchoolId(),
      },
    });

    const discipline = await prisma.discipline.findUnique({
      where: { id: newCourse.disciplineId },
    });

    const professeur = await prisma.appUser.findUnique({
      where: { id: newCourse.professeurId, schoolId: entity.getSchoolId() },
    });

    const classe = await prisma.classe.findUnique({
      where: { id: newCourse.classeId, schoolId: entity.getSchoolId() },
    });

    return Cours.MapToDomain(
      newCourse.jour,
      newCourse.heure,
      newCourse.disciplineId,
      newCourse.professeurId,
      newCourse.classeId,
      newCourse.schoolId,
      newCourse.id,
      discipline!,
      professeur!,
      classe!
    );
  },

  // Find a course by its ID
  async findById(coursId: string, schoolId: string): Promise<Cours | null> {
    const course = await prisma.cours.findUnique({
      where: { id: coursId, schoolId },
      include: {
        discipline: true, // Fetch related discipline
        professeur: true, // Fetch related professor
        classe: true, // Fetch related class
      },
    });

    if (!course) {
      return null;
    }

    return Cours.MapToDomain(
      course.jour,
      course.heure,
      course.disciplineId,
      course.professeurId,
      course.classeId,
      course.schoolId,
      course.id,
      course.discipline,
      course.professeur,
      course.classe
    );
  },

  // Find all courses in a school
  async findAll(schoolId: string): Promise<Cours[]> {
    const courses: any = await prisma.cours.findMany({
      where: { schoolId: schoolId },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses taught by a specific professor
  async findByProfesseur(
    professeurId: string,
    schoolId: string
  ): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: { professeurId: professeurId, schoolId: schoolId },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses of a specific class
  async findByClasse(classeId: string, schoolId: string): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: { classeId: classeId, schoolId: schoolId },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses on a specific day
  async findByDay(day: string, schoolId: string): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: { jour: day, schoolId: schoolId },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses at a specific hour on a specific day
  async findByDayAndHour(
    day: string,
    hour: string,
    schoolId: string
  ): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: { jour: day, heure: hour, schoolId: schoolId },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses within a specific week (start and end date)
  async findByWeek(
    weekStart: Date,
    weekEnd: Date,
    schoolId: string
  ): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: {
        schoolId: schoolId,
        jour: {
          gte: weekStart.toISOString(),
          lte: weekEnd.toISOString(),
        },
      },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses for a professor on a specific day
  async findByProfesseurAndDay(
    professeurId: string,
    day: string,
    schoolId: string
  ): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: { professeurId: professeurId, jour: day, schoolId: schoolId },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses for a professor in a specific week
  async findByProfesseurAndWeek(
    professeurId: string,
    weekStart: Date,
    weekEnd: Date,
    schoolId: string
  ): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: {
        professeurId: professeurId,
        jour: {
          gte: weekStart.toISOString(),
          lte: weekEnd.toISOString(),
        },
        schoolId: schoolId,
      },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses for a class on a specific day
  async findByClasseAndDay(
    classeId: string,
    day: string,
    schoolId: string
  ): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: { classeId: classeId, jour: day, schoolId: schoolId },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },

  // Find all courses for a class in a specific week
  async findByClasseAndWeek(
    classeId: string,
    weekStart: Date,
    weekEnd: Date,
    schoolId: string
  ): Promise<Cours[]> {
    const courses = await prisma.cours.findMany({
      where: {
        classeId: classeId,
        jour: {
          gte: weekStart.toISOString(),
          lte: weekEnd.toISOString(),
        },
        schoolId: schoolId,
      },
      include: {
        discipline: true,
        professeur: true,
        classe: true,
      },
    });

    return courses.map((course: any) =>
      Cours.MapToDomain(
        course.jour,
        course.heure,
        course.disciplineId,
        course.professeurId,
        course.classeId,
        course.schoolId,
        course.id,
        course.discipline,
        course.professeur,
        course.classe
      )
    );
  },
};
