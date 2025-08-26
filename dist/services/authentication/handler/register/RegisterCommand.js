"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCommand = void 0;
class RegisterCommand {
    constructor(email, password, roles, nom, prenom, schoolId, telephone, profession, students, disciplineIds) {
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.nom = nom;
        this.prenom = prenom;
        this.schoolId = schoolId;
        this.telephone = telephone;
        this.profession = profession;
        this.students = students;
        this.disciplineIds = disciplineIds;
    }
}
exports.RegisterCommand = RegisterCommand;
