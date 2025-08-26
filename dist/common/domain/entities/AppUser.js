"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUser = void 0;
const Role_1 = require("../../application/dto/Role");
const Entity_1 = require("../contracts/Entity");
const ValidationError_1 = require("../../application/dto/ValidationError");
class AppUser extends Entity_1.Entity {
    // PRIVATE base constructor
    constructor(email, password, roles, schoolId, nom, prenom, telephone, profession, biographie, children) {
        super();
        this.children = [];
        this.disciplineIds = [];
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.schoolId = schoolId;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.profession = profession;
        this.biographie = biographie;
        this.children = children;
    }
    // ✅ Static creation methods
    static createBaseUser(email, password, roles, schoolId, nom, prenom, telephone, profession, biographie, children) {
        const errors = [];
        if (!this.isValidEmail(email))
            errors.push("Invalid email.");
        if (!this.isValidPassword(password))
            errors.push("Password must be at least 6 characters.");
        if (!this.isValidNom(nom))
            errors.push("Invalid last name.");
        if (!this.isValidPrenom(prenom))
            errors.push("Invalid first name.");
        if (!Array.isArray(roles) || !roles.every(this.isValidRole))
            errors.push("Invalid roles.");
        if (!schoolId)
            errors.push("School ID is required.");
        if (errors.length > 0)
            throw new ValidationError_1.ValidationError(errors);
        return new AppUser(email, password, roles, schoolId, nom, prenom, telephone, profession, biographie, children !== null && children !== void 0 ? children : []);
    }
    // Optional: domain-level validators
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidPassword(password) {
        return typeof password === "string" && password.length >= 6;
    }
    static isValidRole(role) {
        return Object.values(Role_1.Role).includes(role);
    }
    static isValidPrenom(password) {
        return typeof password === "string" && password.length >= 1;
    }
    static isValidNom(password) {
        return typeof password === "string" && password.length >= 1;
    }
    // Getters for new fields
    getNom() {
        return this.nom;
    }
    getPrenom() {
        return this.prenom;
    }
    getTelephone() {
        return this.telephone;
    }
    getProfession() {
        return this.profession;
    }
    // Optional: expose getters
    getEmail() {
        return this.email;
    }
    getRoles() {
        return this.roles;
    }
    getSchoolId() {
        return this.schoolId;
    }
    getPassword() {
        return this.password;
    }
    getBiographie() {
        return this.biographie;
    }
    getChildren() {
        return this.children;
    }
}
exports.AppUser = AppUser;
