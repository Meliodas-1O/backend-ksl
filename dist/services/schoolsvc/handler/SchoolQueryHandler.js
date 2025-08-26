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
exports.GetOneClasseByIdQueryHandler = exports.GetParentByIdQueryHandler = exports.GetTeacherByIdQueryHandler = exports.GetStudentByIdQueryHandler = void 0;
class GetStudentByIdQueryHandler {
    constructor(schoolRepository) {
        this.schoolRepository = schoolRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.schoolRepository.findStudentById(query.studentId, query.schoolId);
        });
    }
}
exports.GetStudentByIdQueryHandler = GetStudentByIdQueryHandler;
class GetTeacherByIdQueryHandler {
    constructor(schoolRepository) {
        this.schoolRepository = schoolRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.schoolRepository.findTeacherById(query.teacherId, query.schoolId);
        });
    }
}
exports.GetTeacherByIdQueryHandler = GetTeacherByIdQueryHandler;
class GetParentByIdQueryHandler {
    constructor(schoolRepository) {
        this.schoolRepository = schoolRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.schoolRepository.findParentById(query.parentId, query.schoolId);
        });
    }
}
exports.GetParentByIdQueryHandler = GetParentByIdQueryHandler;
class GetOneClasseByIdQueryHandler {
    constructor(schoolRepository) {
        this.schoolRepository = schoolRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.schoolRepository.findClasseById(query.classeId, query.schoolId);
        });
    }
}
exports.GetOneClasseByIdQueryHandler = GetOneClasseByIdQueryHandler;
