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
exports.SchoolController = void 0;
const Mediator_1 = require("../../common/mediator/Mediator");
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const ValidationError_1 = require("../../common/application/dto/ValidationError");
const NotFoundError_1 = require("../../common/application/dto/NotFoundError");
const GetStudentsBySchoolQuery_1 = require("../../services/studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQuery");
const GetTeachersBySchoolQuery_1 = require("../../services/schoolsvc/handler/getTeachers/GetTeachersBySchoolQuery");
const GetParentsBySchoolQuery_1 = require("../../services/schoolsvc/handler/getParents/GetParentsBySchoolQuery");
const GetAdminsBySchoolQuery_1 = require("../../services/schoolsvc/handler/getAdmins/GetAdminsBySchoolQuery");
const GetClassesBySchoolQuery_1 = require("../../services/schoolsvc/handler/getClass/GetClassesBySchoolQuery");
const CreateSchoolCommand_1 = require("../../services/schoolsvc/handler/CreateSchool/CreateSchoolCommand");
const GetAllSchoolsQuery_1 = require("../../services/schoolsvc/handler/GetSchools/GetAllSchoolsQuery");
const GetSchoolByIdQuery_1 = require("../../services/schoolsvc/handler/GetSchoolById/GetSchoolByIdQuery");
const DeleteSchoolCommand_1 = require("../../services/schoolsvc/handler/DeleteSchool/DeleteSchoolCommand");
const SchoolQueries_1 = require("../../services/schoolsvc/handler/SchoolQueries");
// ---------------------------------------------
// Command Handlers (Mutations)
// ---------------------------------------------
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const command = new CreateSchoolCommand_1.CreateSchoolCommand(name);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.CREATED).json(result);
    }
    catch (error) {
        console.error("Create school error:", error);
        if (error instanceof ValidationError_1.ValidationError) {
            res.status(StatusCode_1.StatusCode.BAD_REQUEST).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const command = new DeleteSchoolCommand_1.DeleteSchoolCommand(id);
        yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json({ message: "School deleted successfully." });
    }
    catch (error) {
        console.error("Delete school error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Query Handlers (Reads)
// ---------------------------------------------
const getSchoolById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId } = req.params;
        const query = new GetSchoolByIdQuery_1.GetSchoolByIdQuery(schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get school by ID error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getAllSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = new GetAllSchoolsQuery_1.GetAllSchoolsQuery();
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get all schools error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const findStudentsBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId } = req.params;
        const query = new GetStudentsBySchoolQuery_1.GetStudentsBySchoolQuery(schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Get by school error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const findTeachersBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId } = req.params;
        const query = new GetTeachersBySchoolQuery_1.GetTeachersBySchoolQuery(schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Find teachers error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const findParentsBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId } = req.params;
        const query = new GetParentsBySchoolQuery_1.GetParentsBySchoolQuery(schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Find parents error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const findAdminsBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId } = req.params;
        const query = new GetAdminsBySchoolQuery_1.GetAdminsBySchoolQuery(schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Find admins error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const findClassesBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId } = req.params;
        const query = new GetClassesBySchoolQuery_1.GetClassesBySchoolQuery(schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Find classes error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Get One Student
// ---------------------------------------------
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId, studentId } = req.params;
        const query = new SchoolQueries_1.GetStudentByIdQuery(studentId, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Student with ID ${studentId} not found.`);
        }
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get student by ID error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Get One Teacher
// ---------------------------------------------
const getTeacherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId, teacherId } = req.params;
        const query = new SchoolQueries_1.GetTeacherByIdQuery(teacherId, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Teacher with ID ${teacherId} not found.`);
        }
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get teacher by ID error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Get One Parent
// ---------------------------------------------
const getParentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId, parentId } = req.params;
        const query = new SchoolQueries_1.GetParentByIdQuery(parentId, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Parent with ID ${parentId} not found.`);
        }
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get parent by ID error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Get One Classe
// ---------------------------------------------
const getClasseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId, classId } = req.params;
        const query = new SchoolQueries_1.GetOneClasseByIdQuery(classId, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Classe with ID ${classId} not found.`);
        }
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get classe by ID error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
exports.SchoolController = {
    createSchool,
    deleteSchool,
    getSchoolById,
    getAllSchools,
    findStudentsBySchool,
    findTeachersBySchool,
    findParentsBySchool,
    findAdminsBySchool,
    findClassesBySchool,
    getStudentById,
    getTeacherById,
    getParentById,
    getClasseById,
};
