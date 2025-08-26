"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSelfParentQuery = exports.UpdateSelfTeacherQuery = exports.UpdateTeacherFromAdminQuery = exports.UpdateParentFromAdminQuery = void 0;
class UpdateParentFromAdminQuery {
    constructor(parentId, nom, prenom, email, telephone, schoolId) {
        this.parentId = parentId;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.schoolId = schoolId;
    }
}
exports.UpdateParentFromAdminQuery = UpdateParentFromAdminQuery;
class UpdateTeacherFromAdminQuery {
    constructor(profId, nom, prenom, email, telephone, classes, schoolId) {
        this.profId = profId;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.classes = classes;
        this.schoolId = schoolId;
    }
}
exports.UpdateTeacherFromAdminQuery = UpdateTeacherFromAdminQuery;
class UpdateSelfTeacherQuery {
    constructor(profId, nom, prenom, email, telephone, adresse, biographie, schoolId) {
        this.profId = profId;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.adresse = adresse;
        this.biographie = biographie;
        this.schoolId = schoolId;
    }
}
exports.UpdateSelfTeacherQuery = UpdateSelfTeacherQuery;
class UpdateSelfParentQuery {
    constructor(parentId, nom, prenom, email, telephone, adresse, profession, schoolId) {
        this.parentId = parentId;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.adresse = adresse;
        this.profession = profession;
        this.schoolId = schoolId;
    }
}
exports.UpdateSelfParentQuery = UpdateSelfParentQuery;
