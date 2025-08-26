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
exports.UpdateStudentCommandHandler = void 0;
const Student_1 = require("../../../../common/domain/entities/Student");
const UserNotFoundError_1 = require("../../../../common/application/dto/UserNotFoundError");
class UpdateStudentCommandHandler {
    constructor(repository) {
        this.repository = repository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const existingStudent = yield this.repository.findStudentById(command.id);
            if (!existingStudent) {
                throw new UserNotFoundError_1.UserNotFoundError("Student not found");
            }
            const commandStudent = command.student;
            const student = Student_1.Student.updateStudent(commandStudent.nom, commandStudent.prenom, new Date(commandStudent.dateOfBirth), commandStudent.abscence, commandStudent.retards, commandStudent.moyenne, existingStudent.classe, existingStudent.schoolId);
            student.classe = (_a = command.student.classeId) !== null && _a !== void 0 ? _a : "";
            student.parentId = (_b = command.student.parentId) !== null && _b !== void 0 ? _b : "";
            return this.repository.update(command.id, student);
        });
    }
}
exports.UpdateStudentCommandHandler = UpdateStudentCommandHandler;
