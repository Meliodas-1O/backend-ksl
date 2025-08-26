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
exports.coursPrismaRepository = void 0;
const prisma_1 = require("../../../generated/prisma");
const Cours_1 = require("../../domain/entities/Cours"); // Cours entity
const prisma = new prisma_1.PrismaClient(); // Prisma instance
exports.coursPrismaRepository = {
    /**
     * Assign a professor to a specific course.
     * @param coursId The ID of the course.
     * @param professeurId The ID of the professor.
     * @param schoolId The ID of the school.
     * @returns A promise that resolves to the updated course.
     */
    assignProfesseur(coursId, professeurId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            // First, check if the course exists
            const cours = yield prisma.cours.findUnique({
                where: { id: coursId, schoolId },
                include: { professeur: true }, // Assuming you want to include professors in the response
            });
            if (!cours) {
                throw new Error("Course not found");
            }
            // Link the professor to the course (assuming there's a join table or relation in Prisma)
            const updatedCours = yield prisma.cours.update({
                where: { id: coursId },
                data: {
                    professeur: {
                        connect: { id: professeurId }, // Connect professor to course
                    },
                },
            });
            return !!updatedCours;
        });
    },
    /**
     * Assign a subject (matiere) to a specific course.
     * @param coursId The ID of the course.
     * @param matiereId The ID of the subject.
     * @param schoolId The ID of the school.
     * @returns A promise that resolves to the updated course.
     */
    assignMatiere(coursId, matiereId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            // First, check if the course exists
            const cours = yield prisma.cours.findUnique({
                where: { id: coursId, schoolId },
                include: { discipline: true }, // Assuming courses have disciplines (subjects)
            });
            if (!cours) {
                throw new Error("Course not found");
            }
            // Link the subject (matiere) to the course
            const updatedCours = yield prisma.cours.update({
                where: { id: coursId },
                data: {
                    discipline: {
                        connect: { id: matiereId }, // Connect subject to course
                    },
                },
            });
            return !!updatedCours;
        });
    },
    // Update an existing course
    update(id, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCourse = yield prisma.cours.update({
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
            const discipline = yield prisma.discipline.findUnique({
                where: { id: updatedCourse.disciplineId },
            });
            const professeur = yield prisma.appUser.findUnique({
                where: { id: updatedCourse.professeurId },
            });
            const classe = yield prisma.classe.findUnique({
                where: { id: updatedCourse.classeId },
            });
            return Cours_1.Cours.MapToDomain(updatedCourse.jour, updatedCourse.heure, updatedCourse.disciplineId, updatedCourse.professeurId, updatedCourse.classeId, updatedCourse.schoolId, updatedCourse.id, discipline, professeur, classe);
        });
    },
    // Delete a course by its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.cours.delete({
                where: { id: id },
            });
        });
    },
    // Create a new course
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourse = yield prisma.cours.create({
                data: {
                    jour: entity.getJour(),
                    heure: entity.getHeure(),
                    disciplineId: entity.getDisciplineId(),
                    professeurId: entity.getProfesseurId(),
                    classeId: entity.getClasseId(),
                    schoolId: entity.getSchoolId(),
                },
            });
            const discipline = yield prisma.discipline.findUnique({
                where: { id: newCourse.disciplineId },
            });
            const professeur = yield prisma.appUser.findUnique({
                where: { id: newCourse.professeurId, schoolId: entity.getSchoolId() },
            });
            const classe = yield prisma.classe.findUnique({
                where: { id: newCourse.classeId, schoolId: entity.getSchoolId() },
            });
            return Cours_1.Cours.MapToDomain(newCourse.jour, newCourse.heure, newCourse.disciplineId, newCourse.professeurId, newCourse.classeId, newCourse.schoolId, newCourse.id, discipline, professeur, classe);
        });
    },
    // Find a course by its ID
    findById(coursId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield prisma.cours.findUnique({
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
            return Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe);
        });
    },
    // Find all courses in a school
    findAll(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
                where: { schoolId: schoolId },
                include: {
                    discipline: true,
                    professeur: true,
                    classe: true,
                },
            });
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses taught by a specific professor
    findByProfesseur(professeurId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
                where: { professeurId: professeurId, schoolId: schoolId },
                include: {
                    discipline: true,
                    professeur: true,
                    classe: true,
                },
            });
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses of a specific class
    findByClasse(classeId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
                where: { classeId: classeId, schoolId: schoolId },
                include: {
                    discipline: true,
                    professeur: true,
                    classe: true,
                },
            });
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses on a specific day
    findByDay(day, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
                where: { jour: day, schoolId: schoolId },
                include: {
                    discipline: true,
                    professeur: true,
                    classe: true,
                },
            });
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses at a specific hour on a specific day
    findByDayAndHour(day, hour, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
                where: { jour: day, heure: hour, schoolId: schoolId },
                include: {
                    discipline: true,
                    professeur: true,
                    classe: true,
                },
            });
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses within a specific week (start and end date)
    findByWeek(weekStart, weekEnd, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
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
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses for a professor on a specific day
    findByProfesseurAndDay(professeurId, day, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
                where: { professeurId: professeurId, jour: day, schoolId: schoolId },
                include: {
                    discipline: true,
                    professeur: true,
                    classe: true,
                },
            });
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses for a professor in a specific week
    findByProfesseurAndWeek(professeurId, weekStart, weekEnd, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
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
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses for a class on a specific day
    findByClasseAndDay(classeId, day, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
                where: { classeId: classeId, jour: day, schoolId: schoolId },
                include: {
                    discipline: true,
                    professeur: true,
                    classe: true,
                },
            });
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
    // Find all courses for a class in a specific week
    findByClasseAndWeek(classeId, weekStart, weekEnd, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.cours.findMany({
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
            return courses.map((course) => Cours_1.Cours.MapToDomain(course.jour, course.heure, course.disciplineId, course.professeurId, course.classeId, course.schoolId, course.id, course.discipline, course.professeur, course.classe));
        });
    },
};
