"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudentCommand = void 0;
class CreateStudentCommand {
    constructor(nom, prenom, dateOfBirth, schoolId, classe) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateOfBirth = dateOfBirth;
        this.schoolId = schoolId;
        this.classe = classe;
        this.parentId = null;
    }
}
exports.CreateStudentCommand = CreateStudentCommand;
