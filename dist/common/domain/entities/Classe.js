"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classe = void 0;
const Entity_1 = require("../contracts/Entity");
class Classe extends Entity_1.Entity {
    constructor(niveau, nom, schoolId) {
        super();
        this.niveau = niveau;
        this.nom = nom;
        this.schoolId = schoolId;
    }
    static createClasse(niveau, nom, schoolId) {
        return new Classe(niveau, nom, schoolId);
    }
    getNiveau() {
        return this.niveau;
    }
    getNom() {
        return this.nom;
    }
    getSchoolId() {
        return this.schoolId;
    }
}
exports.Classe = Classe;
