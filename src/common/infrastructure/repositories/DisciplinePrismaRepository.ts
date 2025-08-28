import { IDisciplineRepository } from "../../../common/domain/repository/IDisciplineRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Prisma instance

export const disciplinePrismaRepository: IDisciplineRepository = {
    async findAllDisplines(schoolId: string): Promise<any[]> {
        const disciplines = await prisma.discipline.findMany({
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
    },

    async findDisciplineById(id: string, schoolId: string): Promise<any> {
        const discipline = await prisma.discipline.findUnique({
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
    },
};
