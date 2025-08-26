"use strict";
// --- Commands (for state-changing operations) ---
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignMatiereToClasseCommand = exports.AssignProfesseurToClasseCommand = exports.GetDisciplinesInClasseQuery = exports.GetParentsInClasseQuery = exports.GetProfessorsInClasseQuery = exports.GetStudentsInClasseQuery = exports.GetClasseByIdQuery = exports.GetAllClassesQuery = exports.DeleteClasseCommand = exports.UpdateClasseCommand = exports.CreateClasseCommand = void 0;
/**
 * Command to create a new Classe.
 */
class CreateClasseCommand {
    constructor(nom, niveau, schoolId) {
        this.nom = nom;
        this.niveau = niveau;
        this.schoolId = schoolId;
    }
}
exports.CreateClasseCommand = CreateClasseCommand;
/**
 * Command to update an existing Classe.
 */
class UpdateClasseCommand {
    constructor(classeId, nom, niveau, schoolId) {
        this.classeId = classeId;
        this.nom = nom;
        this.niveau = niveau;
        this.schoolId = schoolId;
    }
}
exports.UpdateClasseCommand = UpdateClasseCommand;
/**
 * Command to delete a Classe.
 */
class DeleteClasseCommand {
    constructor(classeId) {
        this.classeId = classeId;
    }
}
exports.DeleteClasseCommand = DeleteClasseCommand;
// --- Queries (for data retrieval) ---
/**
 * Query to get all Classes.
 */
class GetAllClassesQuery {
    constructor(schoolId) {
        this.schoolId = schoolId;
    }
}
exports.GetAllClassesQuery = GetAllClassesQuery;
/**
 * Query to get a specific Classe by its ID.
 */
class GetClasseByIdQuery {
    constructor(classeId, schoolId) {
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.GetClasseByIdQuery = GetClasseByIdQuery;
/**
 * Query to get all Students in a specific Classe.
 */
class GetStudentsInClasseQuery {
    constructor(classeId, schoolId) {
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.GetStudentsInClasseQuery = GetStudentsInClasseQuery;
/**
 * Query to get all Professors teaching a specific Classe.
 */
class GetProfessorsInClasseQuery {
    constructor(classeId, schoolId) {
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.GetProfessorsInClasseQuery = GetProfessorsInClasseQuery;
/**
 * Query to get all Parents of students in a specific Classe.
 */
class GetParentsInClasseQuery {
    constructor(classeId, schoolId) {
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.GetParentsInClasseQuery = GetParentsInClasseQuery;
/**
 * Query to get all Disciplines in a specific Classe.
 */
class GetDisciplinesInClasseQuery {
    constructor(classeId, schoolId) {
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.GetDisciplinesInClasseQuery = GetDisciplinesInClasseQuery;
/**
 * Command to assign a Professor to a Classe.
 */
class AssignProfesseurToClasseCommand {
    constructor(classeId, professeurId, schoolId) {
        this.classeId = classeId;
        this.professeurId = professeurId;
        this.schoolId = schoolId;
    }
}
exports.AssignProfesseurToClasseCommand = AssignProfesseurToClasseCommand;
/**
 * Command to assign a Matiere (Subject) to a Classe.
 * This can also be used to create a new subject and link it.
 */
class AssignMatiereToClasseCommand {
    constructor(classeId, matiereId, schoolId) {
        this.classeId = classeId;
        this.matiereId = matiereId;
        this.schoolId = schoolId;
    }
}
exports.AssignMatiereToClasseCommand = AssignMatiereToClasseCommand;
