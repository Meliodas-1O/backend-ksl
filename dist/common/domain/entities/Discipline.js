"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discipline = void 0;
const Entity_1 = require("../contracts/Entity");
class Discipline extends Entity_1.Entity {
    constructor(_nom) {
        super();
        this.nom = _nom;
    }
    getNom() {
        return this.nom;
    }
}
exports.Discipline = Discipline;
