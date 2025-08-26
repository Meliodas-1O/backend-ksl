"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudentCommandHandler = void 0;
const Student_1 = require("../../../../common/domain/entities/Student");
class CreateStudentCommandHandler {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    execute(command) {
        const student = Student_1.Student.createStudent(command.nom, command.prenom, command.dateOfBirth, 0, 0, 0, command.classe, command.schoolId);
        student.parentId = command.parentId;
        return this.studentRepository.create(student);
    }
}
exports.CreateStudentCommandHandler = CreateStudentCommandHandler;
