"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignMatiereToClasseCommandHandler = exports.AssignProfesseurToClasseCommandHandler = exports.GetDisciplinesInClasseQueryHandler = exports.GetParentsInClasseQueryHandler = exports.GetProfessorsInClasseQueryHandler = exports.GetStudentsInClasseQueryHandler = exports.GetClasseByIdQueryHandler = exports.GetAllClassesQueryHandler = exports.DeleteClasseCommandHandler = exports.UpdateClasseCommandHandler = exports.CreateClasseCommandHandler = void 0;
const Classe_1 = require("../../../common/domain/entities/Classe");
class CreateClasseCommandHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("schoolId", command.schoolId);
            console.log("nom", command.nom);
            console.log("niveau", command.niveau);
            const classe = Classe_1.Classe.createClasse(command.niveau, command.nom, command.schoolId);
            return this.classeRepository.create(classe);
        });
    }
}
exports.CreateClasseCommandHandler = CreateClasseCommandHandler;
class UpdateClasseCommandHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = Classe_1.Classe.createClasse(command.niveau, command.nom, command.schoolId);
            return this.classeRepository.update(command.classeId, classe);
        });
    }
}
exports.UpdateClasseCommandHandler = UpdateClasseCommandHandler;
class DeleteClasseCommandHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.delete(command.classeId);
        });
    }
}
exports.DeleteClasseCommandHandler = DeleteClasseCommandHandler;
// --- Query Handlers ---
class GetAllClassesQueryHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.findAll(query.schoolId);
        });
    }
}
exports.GetAllClassesQueryHandler = GetAllClassesQueryHandler;
class GetClasseByIdQueryHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.findById(query.classeId, query.schoolId);
        });
    }
}
exports.GetClasseByIdQueryHandler = GetClasseByIdQueryHandler;
class GetStudentsInClasseQueryHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.findStudentsByClasse(query.classeId, query.schoolId);
        });
    }
}
exports.GetStudentsInClasseQueryHandler = GetStudentsInClasseQueryHandler;
class GetProfessorsInClasseQueryHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.findProfessorsByClasse(query.classeId, query.schoolId);
        });
    }
}
exports.GetProfessorsInClasseQueryHandler = GetProfessorsInClasseQueryHandler;
class GetParentsInClasseQueryHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.findParentsByClasse(query.classeId, query.schoolId);
        });
    }
}
exports.GetParentsInClasseQueryHandler = GetParentsInClasseQueryHandler;
class GetDisciplinesInClasseQueryHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.findDisciplinesByClasse(query.classeId, query.schoolId);
        });
    }
}
exports.GetDisciplinesInClasseQueryHandler = GetDisciplinesInClasseQueryHandler;
class AssignProfesseurToClasseCommandHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.assignProfesseur(command.classeId, command.professeurId, command.schoolId);
        });
    }
}
exports.AssignProfesseurToClasseCommandHandler = AssignProfesseurToClasseCommandHandler;
class AssignMatiereToClasseCommandHandler {
    constructor(classeRepository) {
        this.classeRepository = classeRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classeRepository.assignMatiere(command.classeId, command.matiereId, command.schoolId);
        });
    }
}
exports.AssignMatiereToClasseCommandHandler = AssignMatiereToClasseCommandHandler;
