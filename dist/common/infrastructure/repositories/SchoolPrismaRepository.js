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
exports.schoolPrismaRepository = void 0;
const prisma_1 = require("../../../generated/prisma");
// Initialize the Prisma client
const prisma = new prisma_1.PrismaClient();
// This is the implementation of your repository interface
exports.schoolPrismaRepository = {
    // Generic repository methods
    create(school) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.school.create({
                data: {
                    name: school.getName(),
                },
            });
        });
    },
    update(id, school) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.school.update({
                where: { id },
                data: {
                    name: school.getName(),
                },
            });
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.school.delete({
                where: { id },
            });
        });
    },
    // Specific methods for finding users and classes by school
    findStudentsBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.student.findMany({
                where: {
                    schoolId: schoolId,
                },
                include: {
                    classe: true,
                    parent: {
                        select: {
                            id: true,
                            nom: true,
                            prenom: true,
                        },
                    },
                },
            });
        });
    },
    findTeachersBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.appUser.findMany({
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    email: true,
                    schoolId: true,
                    telephone: true,
                    classes: true,
                    disciplines: true,
                },
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
            });
        });
    },
    findParentsBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.appUser.findMany({
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    email: true,
                    telephone: true,
                    children: true,
                },
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
            });
        });
    },
    findAdminsBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.appUser.findMany({
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    telephone: true,
                },
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
        });
    },
    findClassesBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.classe.findMany({
                where: {
                    schoolId: schoolId,
                },
                include: {
                    students: true,
                    professeurs: {
                        include: {
                            professeur: {
                                select: {
                                    id: true,
                                    nom: true,
                                    prenom: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    },
    // Specific methods to get one parent, teacher, classe, admin
    findStudentById(studentId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.student.findFirst({
                where: {
                    id: studentId,
                    schoolId: schoolId,
                },
                include: {
                    classe: true,
                    parent: {
                        select: {
                            id: true,
                            nom: true,
                            prenom: true,
                        },
                    },
                },
            });
        });
    },
    findTeacherById(teacherId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield prisma.appUser.findFirst({
                where: {
                    id: teacherId,
                    schoolId: schoolId,
                    userRoles: {
                        some: {
                            role: {
                                name: "TEACHER",
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    biographie: true,
                    telephone: true,
                    email: true,
                    schoolId: true,
                    classes: {
                        include: {
                            classe: {
                                include: {
                                    students: true, // ✅ Include students in each class
                                },
                            },
                        },
                    },
                    disciplines: true,
                },
            });
            if (!teacher)
                return null;
            // ✅ Sum the total number of students across all classes
            const totalStudents = teacher.classes.reduce((acc, classeProf) => {
                return acc + (classeProf.classe.students.length || 0);
            }, 0);
            return Object.assign(Object.assign({}, teacher), { totalStudents });
        });
    },
    findParentById(parentId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.appUser.findFirst({
                where: {
                    id: parentId,
                    schoolId: schoolId,
                    userRoles: {
                        some: {
                            role: {
                                name: "PARENT",
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    telephone: true,
                    email: true,
                    schoolId: true,
                    profession: true,
                    children: {
                        include: {
                            classe: true,
                        },
                    },
                },
            });
        });
    },
    findClasseById(classeId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.classe.findFirst({
                where: {
                    id: classeId,
                    schoolId: schoolId,
                },
                include: {
                    students: true,
                    professeurs: {
                        include: {
                            professeur: {
                                select: {
                                    id: true,
                                    nom: true,
                                    prenom: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    },
    getAllSchools: function () {
        return prisma.school.findMany();
    },
    getSchoolById: function (schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield prisma.school.findFirst({
                where: { id: schoolId },
                include: {
                    _count: {
                        select: {
                            students: true,
                            classes: true,
                        },
                    },
                },
            });
            if (!school)
                return null;
            const teacherCount = yield prisma.userRole.count({
                where: {
                    user: {
                        schoolId,
                    },
                    role: {
                        name: "TEACHER",
                    },
                },
            });
            return Object.assign(Object.assign({}, school), { _count: Object.assign(Object.assign({}, school._count), { teachers: teacherCount }) });
        });
    },
};
