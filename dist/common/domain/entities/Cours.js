"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cours = void 0;
const Entity_1 = require("../contracts/Entity");
class Cours extends Entity_1.Entity {
    // Private constructor to enforce use of factory method
    constructor(jour, heure, disciplineId, professeurId, classeId, schoolId) {
        super(); // Assuming the base Entity has an id field
        this.jour = jour;
        this.heure = heure;
        this.disciplineId = disciplineId;
        this.professeurId = professeurId;
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
    // Factory method to create a new Cours instance
    static createCours(jour, heure, disciplineId, professeurId, classeId, schoolId) {
        return new Cours(jour, heure, disciplineId, professeurId, classeId, schoolId);
    }
    // Factory method to create a new Cours instance
    static MapToDomain(jour, heure, disciplineId, professeurId, classeId, schoolId, id, discipline, // Add discipline parameter
    professeur, // Add professeur parameter
    classe // Add classe parameter
    ) {
        const cours = new Cours(jour, heure, disciplineId, professeurId, classeId, schoolId);
        cours.setId(id);
        cours.discipline = discipline; // Set discipline
        cours.professeur = professeur; // Set professeur
        cours.classe = classe; // Set classe
        return cours;
    }
    // Getters for the private fields
    getJour() {
        return this.jour;
    }
    getHeure() {
        return this.heure;
    }
    getDisciplineId() {
        return this.disciplineId;
    }
    getProfesseurId() {
        return this.professeurId;
    }
    getClasseId() {
        return this.classeId;
    }
    getSchoolId() {
        return this.schoolId;
    }
}
exports.Cours = Cours;
