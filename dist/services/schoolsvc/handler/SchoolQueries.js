"use strict";
// --- Queries to get a specific entity in a school context ---
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneClasseByIdQuery = exports.GetParentByIdQuery = exports.GetTeacherByIdQuery = exports.GetStudentByIdQuery = void 0;
class GetStudentByIdQuery {
    constructor(studentId, schoolId) {
        this.studentId = studentId;
        this.schoolId = schoolId;
    }
}
exports.GetStudentByIdQuery = GetStudentByIdQuery;
class GetTeacherByIdQuery {
    constructor(teacherId, schoolId) {
        this.teacherId = teacherId;
        this.schoolId = schoolId;
    }
}
exports.GetTeacherByIdQuery = GetTeacherByIdQuery;
class GetParentByIdQuery {
    constructor(parentId, schoolId) {
        this.parentId = parentId;
        this.schoolId = schoolId;
    }
}
exports.GetParentByIdQuery = GetParentByIdQuery;
class GetOneClasseByIdQuery {
    constructor(classeId, schoolId) {
        this.classeId = classeId;
        this.schoolId = schoolId;
    }
}
exports.GetOneClasseByIdQuery = GetOneClasseByIdQuery;
