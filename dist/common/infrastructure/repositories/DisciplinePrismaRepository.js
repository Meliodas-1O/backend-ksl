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
exports.disciplinePrismaRepository = void 0;
const prisma_1 = require("../../../generated/prisma");
const prisma = new prisma_1.PrismaClient(); // Prisma instance
exports.disciplinePrismaRepository = {
    findAllDisplines(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const disciplines = yield prisma.discipline.findMany({
                include: {
                    teachers: {
                        where: {
                            schoolId,
                        },
                        select: {
                            id: true,
                            nom: true,
                            prenom: true,
                        },
                    },
                },
            });
            return disciplines;
        });
    },
    findDisciplineById(id, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const discipline = yield prisma.discipline.findUnique({
                where: { id },
                include: {
                    teachers: {
                        where: {
                            schoolId: schoolId,
                        },
                        select: {
                            id: true,
                            nom: true,
                            prenom: true,
                        },
                    },
                },
            });
            return discipline;
        });
    },
};
