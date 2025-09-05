import { IClasseRepository } from "../../../common/domain/repository/IClasseRepository";
import { PrismaClient } from "@prisma/client";
import { Classe } from "../../../common/domain/entities/Classe";

// Initialize the Prisma client
const prisma = new PrismaClient();

export const classePrismaRepository: IClasseRepository = {
  /**
   * Finds all Classe records in the database.
   * @returns A promise that resolves to an array of all Classes.
   */
  findAll: async function (schoolId: string): Promise<any[]> {
    const classes = await prisma.classe.findMany({ where: { schoolId } });
    return classes;
  },

  /**
   * Finds a Classe by its unique ID.
   * @param classeId The ID of the classe to find.
   * @returns A promise that resolves to the Classe, or null if not found.
   */
  findById: async function (
    classeId: string,
    schoolId: string
  ): Promise<Classe | null> {
    const classe = await prisma.classe.findUnique({
      where: { id: classeId, schoolId },
    });
    return classe as Classe | null;
  },

  /**
   * Finds all Students enrolled in a specific Classe.
   * This query includes the 'students' relation for the found class.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of Students.
   */
  findStudentsByClasse: async function (
    classeId: string,
    schoolId: string
  ): Promise<any[]> {
    const classeWithStudents = await prisma.classe.findUnique({
      where: { id: classeId, schoolId },
      include: {
        students: true,
      },
    });
    return classeWithStudents?.students || [];
  },

  /**
   * Finds all Professors teaching a specific Classe.
   * This involves querying the 'ClasseProfesseur' join table.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of AppUser (professors).
   */
  findProfessorsByClasse: async function (
    classeId: string,
    schoolId: string
  ): Promise<any[]> {
    const classeWithProfessors = await prisma.classeProfesseur.findMany({
      where: { classeId },
    });
    const professeurs = [];
    for (const profClass of classeWithProfessors) {
      const prof = await prisma.appUser.findFirst({
        where: { id: profClass.professeurId },
      });
      // @ts-ignore
      professeurs.push(prof);
    }
    // We map the join table records to get the actual professor objects
    //const professors = classeWithProfessors?.professeurs.map((cp) => cp.professeur) || [];
    return professeurs;
  },

  /**
   * Finds all Parents of students in a specific Classe.
   * This is a clever query that finds all AppUsers who have a child
   * whose 'classeId' matches the given ID.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of AppUser (parents).
   */
  findParentsByClasse: async function (
    classeId: string,
    schoolId: string
  ): Promise<any[]> {
    const parents = await prisma.appUser.findMany({
      where: {
        schoolId,
        children: {
          some: {
            classeId: classeId,
          },
        },
      },
      // You can include relations if needed, e.g., include: { children: true }
    });
    return parents;
  },

  /**
   * Finds all unique Disciplines taught in a specific Classe.
   * This is a multi-step query: it finds the class, then all its matieres,
   * then all the disciplines for those matieres, and finally removes duplicates.
   * @param classeId The ID of the classe.
   * @returns A promise that resolves to an array of Discipline.
   */
  findDisciplinesByClasse: async function (
    classeId: string,
    schoolId: string
  ): Promise<any[]> {
    const classe = await prisma.classe.findUnique({
      where: { id: classeId, schoolId },
      include: {
        cours: {
          include: {
            discipline: true, // Include the many-to-many relation
          },
        },
      },
    });

    if (!classe) {
      return [];
    }

    // Flatten the array of disciplines from all subjects
    const allDisciplines = classe.cours.flatMap(
      (matiere) => matiere.discipline
    );

    // Filter for unique disciplines using a Set to avoid duplicates
    const uniqueDisciplines = Array.from(
      new Map(allDisciplines.map((d) => [d.id, d])).values()
    );

    return uniqueDisciplines;
  },

  assignProfesseur: async function (
    classeId: string,
    professeurId: string
  ): Promise<any> {
    // This creates a record in the ClasseProfesseur join table
    const updatedClasse = await prisma.classe.findUnique({
      where: { id: classeId },
    });
    const existingRelation = await prisma.classeProfesseur.findFirst({
      where: {
        classeId,
        professeurId,
      },
    });
    if (existingRelation) {
      return updatedClasse;
    }

    await prisma.classeProfesseur.create({
      data: {
        classeId,
        professeurId,
      },
    });

    return updatedClasse;
  },

  revokeProfesseur: async function (
    classeId: string,
    professeurId: string,
    schoolId: string
  ): Promise<void> {
    await prisma.classeProfesseur.delete({
      where: {
        classeId_professeurId: {
          classeId,
          professeurId,
        },
      },
    });
  },

  assignMatiere: async function (
    classeId: string,
    matiereId: string,
    schoolId: string
  ): Promise<any> {
    const updatedClasse = await prisma.classe.update({
      where: { id: classeId, schoolId },
      data: {
        cours: {
          connect: {
            id: matiereId,
          },
        },
      },
    });
    return updatedClasse;
  },

  /**
   * Creates a new Classe record.
   * @param classeData The data for the new classe.
   * @returns A promise that resolves to the newly created Classe.
   */
  create: async function (classe: Classe): Promise<any> {
    const newClasse = await prisma.classe.create({
      data: {
        nom: classe.getNom(),
        niveau: classe.getNiveau(),
        schoolId: classe.getSchoolId(),
      },
    });
    return newClasse;
  },

  /**
   * Updates an existing Classe record.
   * @param classeId The ID of the classe to update.
   * @param updateData The data to update (nom and/or niveau).
   * @returns A promise that resolves to the updated Classe, or null if not found.
   */
  update: async function (
    classeId: string,
    updateData: Classe
  ): Promise<any | null> {
    try {
      const updatedClasse = await prisma.classe.update({
        where: { id: classeId },
        data: {
          nom: updateData.getNom(),
          niveau: updateData.getNiveau(),
        },
      });
      return updatedClasse;
    } catch (error) {
      // Prisma throws an error if the record is not found.
      // We can return null to indicate this case gracefully.
      return null;
    }
  },

  /**
   * Deletes a Classe record by its ID.
   * @param classeId The ID of the classe to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delete: async function (classeId: string): Promise<void> {
    await prisma.classe.delete({
      where: { id: classeId },
    });
  },
};
