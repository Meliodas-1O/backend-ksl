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
exports.UpdateSelfParentCommandHandler = exports.UpdateSelfTeacherCommandHandler = exports.UpdateTeacherFromAdminCommandHandler = exports.UpdateParentFromAdminCommandHandler = void 0;
// Update Parent Handler
class UpdateParentFromAdminCommandHandler {
    constructor(appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = {
                nom: command.nom,
                prenom: command.prenom,
                email: command.email,
                telephone: command.telephone,
            };
            return this.appUserRepository.updateParent(command.parentId, parent, command.schoolId);
        });
    }
}
exports.UpdateParentFromAdminCommandHandler = UpdateParentFromAdminCommandHandler;
// Update Teacher Handler
class UpdateTeacherFromAdminCommandHandler {
    constructor(appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = {
                nom: command.nom,
                prenom: command.prenom,
                email: command.email,
                telephone: command.telephone,
                classes: command.classes,
            };
            return this.appUserRepository.updateTeacher(command.profId, teacher, command.schoolId);
        });
    }
}
exports.UpdateTeacherFromAdminCommandHandler = UpdateTeacherFromAdminCommandHandler;
// Update Teacher (Self) Handler
class UpdateSelfTeacherCommandHandler {
    constructor(appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = {
                nom: command.nom,
                prenom: command.prenom,
                email: command.email,
                telephone: command.telephone,
                biographie: command.biographie,
                adresse: command.adresse,
                schoolId: command.schoolId,
            };
            return this.appUserRepository.updateTeacher(command.profId, teacher, command.schoolId);
        });
    }
}
exports.UpdateSelfTeacherCommandHandler = UpdateSelfTeacherCommandHandler;
// Update Parent (Self) Handler
class UpdateSelfParentCommandHandler {
    constructor(appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = {
                nom: command.nom,
                prenom: command.prenom,
                email: command.email,
                telephone: command.telephone,
                profession: command.profession,
                adresse: command.adresse,
                schoolId: command.schoolId,
            };
            return this.appUserRepository.updateParent(command.parentId, parent, command.schoolId);
        });
    }
}
exports.UpdateSelfParentCommandHandler = UpdateSelfParentCommandHandler;
