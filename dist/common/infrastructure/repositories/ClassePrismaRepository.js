"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classePrismaRepository = void 0;
const prisma_1 = require("../../../generated/prisma");
// Initialize the Prisma client
const prisma = new prisma_1.PrismaClient();
exports.classePrismaRepository = {
    /**
     * Finds all Classe records in the database.
     * @returns A promise that resolves to an array of all Classes.
     */
    findAll: function (schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield prisma.classe.findMany({ where: { schoolId } });
            return classes;
        });
    },
    /**
     * Finds a Classe by its unique ID.
     * @param classeId The ID of the classe to find.
     * @returns A promise that resolves to the Classe, or null if not found.
     */
    findById: function (classeId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield prisma.classe.findUnique({
                where: { id: classeId, schoolId },
            });
            return classe;
        });
    },
    /**
     * Finds all Students enrolled in a specific Classe.
     * This query includes the 'students' relation for the found class.
     * @param classeId The ID of the classe.
     * @returns A promise that resolves to an array of Students.
     */
    findStudentsByClasse: function (classeId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classeWithStudents = yield prisma.classe.findUnique({
                where: { id: classeId, schoolId },
                include: {
                    students: true,
                },
            });
            return (classeWithStudents === null || classeWithStudents === void 0 ? void 0 : classeWithStudents.students) || [];
        });
    },
    /**
     * Finds all Professors teaching a specific Classe.
     * This involves querying the 'ClasseProfesseur' join table.
     * @param classeId The ID of the classe.
     * @returns A promise that resolves to an array of AppUser (professors).
     */
    findProfessorsByClasse: function (classeId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classeWithProfessors = yield prisma.classeProfesseur.findMany({
                where: { classeId },
            });
            console.log("classW", classeWithProfessors);
            const professeurs = [];
            for (const profClass of classeWithProfessors) {
                const prof = yield prisma.appUser.findFirst({
                    where: { id: profClass.professeurId },
                });
                professeurs.push(prof);
            }
            // We map the join table records to get the actual professor objects
            //const professors = classeWithProfessors?.professeurs.map((cp) => cp.professeur) || [];
            return professeurs;
        });
    },
    /**
     * Finds all Parents of students in a specific Classe.
     * This is a clever query that finds all AppUsers who have a child
     * whose 'classeId' matches the given ID.
     * @param classeId The ID of the classe.
     * @returns A promise that resolves to an array of AppUser (parents).
     */
    findParentsByClasse: function (classeId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parents = yield prisma.appUser.findMany({
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
        });
    },
    /**
     * Finds all unique Disciplines taught in a specific Classe.
     * This is a multi-step query: it finds the class, then all its matieres,
     * then all the disciplines for those matieres, and finally removes duplicates.
     * @param classeId The ID of the classe.
     * @returns A promise that resolves to an array of Discipline.
     */
    findDisciplinesByClasse: function (classeId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield prisma.classe.findUnique({
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
            const allDisciplines = classe.cours.flatMap((matiere) => matiere.discipline);
            // Filter for unique disciplines using a Set to avoid duplicates
            const uniqueDisciplines = Array.from(new Map(allDisciplines.map((d) => [d.id, d])).values());
            return uniqueDisciplines;
        });
    },
    assignProfesseur: function (classeId, professeurId) {
        return __awaiter(this, void 0, void 0, function* () {
            // This creates a record in the ClasseProfesseur join table
            yield prisma.classeProfesseur.create({
                data: {
                    classeId,
                    professeurId,
                },
            });
            // Return the updated class with its new relation
            const updatedClasse = yield prisma.classe.findUnique({
                where: { id: classeId },
            });
            return updatedClasse;
        });
    },
    assignMatiere: function (classeId, matiereId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedClasse = yield prisma.classe.update({
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
        });
    },
    /**
     * Creates a new Classe record.
     * @param classeData The data for the new classe.
     * @returns A promise that resolves to the newly created Classe.
     */
    create: function (classe) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClasse = yield prisma.classe.create({
                data: {
                    nom: classe.getNom(),
                    niveau: classe.getNiveau(),
                    schoolId: classe.getSchoolId(),
                },
            });
            return newClasse;
        });
    },
    /**
     * Updates an existing Classe record.
     * @param classeId The ID of the classe to update.
     * @param updateData The data to update (nom and/or niveau).
     * @returns A promise that resolves to the updated Classe, or null if not found.
     */
    update: function (classeId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedClasse = yield prisma.classe.update({
                    where: { id: classeId },
                    data: {
                        nom: updateData.getNom(),
                        niveau: updateData.getNiveau(),
                    },
                });
                return updatedClasse;
            }
            catch (error) {
                // Prisma throws an error if the record is not found.
                // We can return null to indicate this case gracefully.
                return null;
            }
        });
    },
    /**
     * Deletes a Classe record by its ID.
     * @param classeId The ID of the classe to delete.
     * @returns A promise that resolves when the operation is complete.
     */
    delete: function (classeId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.classe.delete({
                where: { id: classeId },
            });
        });
    },
};
