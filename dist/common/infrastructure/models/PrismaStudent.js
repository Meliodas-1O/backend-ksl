"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPrismaStudentToDomain = MapPrismaStudentToDomain;
function MapPrismaStudentToDomain(prismaStudent) {
    console.log("je suis prismaStudent", prismaStudent);
    const studentDto = {
        id: prismaStudent.id,
        schoolId: prismaStudent.schoolId,
        nom: prismaStudent.nom,
        prenom: prismaStudent.prenom,
        abscence: prismaStudent.abscence,
        retards: prismaStudent.retards,
        moyenne: prismaStudent.moyenne,
        classe: {
            nom: prismaStudent.classe.nom,
            niveau: prismaStudent.classe.niveau,
        },
    };
    if (prismaStudent.parentId) {
        studentDto.parent = {
            id: prismaStudent.parentId,
            nom: prismaStudent.parent.nom,
            prenom: prismaStudent.parent.prenom,
        };
    }
    return studentDto;
}
