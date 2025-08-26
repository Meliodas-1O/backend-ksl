"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
const Entity_1 = require("../contracts/Entity");
class School extends Entity_1.Entity {
    constructor(_name) {
        super();
        this.name = _name;
    }
    static createClasse(name) {
        return new School(name);
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
exports.School = School;
