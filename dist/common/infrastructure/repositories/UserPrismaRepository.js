"use strict";
// Assuming your User type and Prisma client are defined like this:
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
exports.userPrismaRepository = void 0;
const prisma_1 = require("../../../generated/prisma");
const PrismaAppUser_1 = require("../models/PrismaAppUser");
const prisma = new prisma_1.PrismaClient();
exports.userPrismaRepository = {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                const disciplineRequest = {
                    connect: user.disciplineIds.map((id) => ({ id })),
                };
                const schoolRequest = {
                    connect: { id: user.getSchoolId() },
                };
                const request = {
                    nom: user.getNom(),
                    prenom: user.getPrenom(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    School: schoolRequest,
                    userRoles: { create: rolesRequest },
                    children: { create: childrenRequest },
                    telephone: (_a = user.getTelephone()) !== null && _a !== void 0 ? _a : "",
                    profession: (_b = user.getProfession()) !== null && _b !== void 0 ? _b : "",
                    disciplines: disciplineRequest,
                };
                const createdUser = yield prisma.appUser.create({
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
                const domainUser = (0, PrismaAppUser_1.mapPrismaUserToDomain)(createdUser);
                return domainUser;
            }
            catch (error) {
                console.error("Error creating user in database:", error);
                throw new Error("Failed to create user in database");
            }
        });
    },
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const updatedUser = yield prisma.appUser.update({
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
            }
            catch (error) {
                console.error("Error updating user in database:", error);
                throw new Error(`Failed to update user with id ${id} in database`);
            }
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.appUser.delete({
                where: { id },
            });
        });
    },
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const appUser = yield prisma.appUser.findFirst({
                where: { email },
                include: {
                    userRoles: {
                        include: { role: true },
                    },
                },
            });
            return appUser;
        });
    },
    findUserByEmailAndSchool(email, schoolName) {
        return __awaiter(this, void 0, void 0, function* () {
            const appUser = yield prisma.appUser.findFirst({
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
            const existingUser = (0, PrismaAppUser_1.mapPrismaUserToDomain)(appUser);
            return existingUser;
        });
    },
    updateParent: function (id, parent, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the parent in the database using Prisma
                yield prisma.appUser.update({
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
            }
            catch (error) {
                console.error("Error updating parent:", error);
                throw new Error("Failed to update parent");
            }
        });
    },
    updateTeacher: function (id, teacher, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const request = {
                nom: teacher.nom,
                prenom: teacher.prenom,
                email: teacher.email,
                telephone: teacher.telephone,
                biographie: (_a = teacher.biographie) !== null && _a !== void 0 ? _a : "",
            };
            console.log("teachers ", id);
            try {
                // Optionally, update teacher's associated classes, if needed
                if (teacher.classes && teacher.classes.length > 0) {
                    yield prisma.classeProfesseur.deleteMany({
                        where: {
                            professeurId: id, // Delete existing teacher-class associations
                        },
                    });
                    const teacherClassRequest = teacher.classes.map((c) => ({
                        professeurId: id,
                        classeId: c,
                    }));
                    yield prisma.classeProfesseur.createMany({
                        data: teacherClassRequest,
                    });
                }
                yield prisma.appUser.update({
                    where: {
                        id,
                        schoolId,
                    },
                    data: request,
                });
            }
            catch (error) {
                console.error("Error updating teacher:", error);
                throw new Error("Failed to update teacher");
            }
        });
    },
};
