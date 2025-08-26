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
exports.studentPrismaRepository = void 0;
const prisma_1 = require("../../../generated/prisma");
const PrismaStudent_1 = require("../models/PrismaStudent");
const prisma = new prisma_1.PrismaClient();
exports.studentPrismaRepository = {
    findStudentBySchool: function (schoolId) {
        return prisma.student.findMany({
            where: { schoolId },
            include: { parent: true, classe: true },
        });
    },
    findStudentByClass: function (classId, schoolName) {
        throw new Error("Function not implemented.");
    },
    assignStudentToClass: function (student, classId, schoolId) {
        throw new Error("Function not implemented.");
    },
    revokeStudentToClass: function (student, classId, schoolId) {
        throw new Error("Function not implemented.");
    },
    create: function (entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
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
                const student = yield prisma.student.create({
                    data,
                    include: { parent: true, classe: true },
                });
                return (0, PrismaStudent_1.MapPrismaStudentToDomain)(student);
            }
            catch (error) {
                console.error("Failed to create student:", error);
                throw error;
            }
        });
    },
    update: function (id, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
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
                const updated = yield prisma.student.update({
                    where: { id, schoolId: entity.schoolId },
                    include: { parent: true, classe: true },
                    data: request,
                });
                return updated;
            }
            catch (error) {
                console.error("Failed to update student:", error);
                throw error;
            }
        });
    },
    delete: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.student.delete({ where: { id } });
            }
            catch (error) {
                console.error("Failed to delete student:", error);
                throw error;
            }
        });
    },
    findStudentById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.student.findFirst({ where: { id }, include: { parent: true, classe: true } });
        });
    },
};
