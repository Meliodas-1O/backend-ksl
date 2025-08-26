"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const Entity_1 = require("../contracts/Entity");
class Student extends Entity_1.Entity {
    constructor(nom, prenom, date, abscence, retards, moyenne, classe, schoolId) {
        super();
        this.parentId = null;
        this.nom = nom;
        this.prenom = prenom;
        this.dateOfBirth = date;
        this.abscence = abscence;
        this.retards = retards;
        this.moyenne = moyenne;
        (this.classe = classe), (this.schoolId = schoolId);
    }
    static createStudent(nom, prenom, date, abscence, retards, moyenne, classe, schoolId) {
        return new Student(nom, prenom, date, abscence, retards, moyenne, classe, schoolId);
    }
    static updateStudent(nom, prenom, date, abscence, retards, moyenne, classe, schoolId) {
        return this.createStudent(nom, prenom, date, abscence, retards, moyenne, classe, schoolId);
    }
    getNom() {
        return this.nom;
    }
    getPrenom() {
        return this.prenom;
    }
    getDateOfBirth() {
        return this.dateOfBirth;
    }
    getAbscence() {
        return this.abscence;
    }
    getRetards() {
        return this.retards;
    }
    getMoyenne() {
        return this.moyenne;
    }
    setNom(nom) {
        this.nom = nom;
    }
    setPrenom(prenom) {
        this.prenom = prenom;
    }
    setDateOfBirth(date) {
        this.dateOfBirth = date;
    }
    setAbscence(abscence) {
        this.abscence = abscence;
    }
    setRetards(retards) {
        this.retards = retards;
    }
    setMoyenne(moyenne) {
        this.moyenne = moyenne;
    }
}
exports.Student = Student;
