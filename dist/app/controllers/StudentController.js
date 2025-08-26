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
exports.StudentController = exports.createStudent = void 0;
const Mediator_1 = require("../../common/mediator/Mediator");
const CreateStudentCommand_1 = require("../../services/studentsvc/handler/Create/CreateStudentCommand");
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const UpdateStudentCommand_1 = require("../../services/studentsvc/handler/Update/UpdateStudentCommand");
const DeleteStudentCommand_1 = require("../../services/studentsvc/handler/Delete/DeleteStudentCommand");
const GetStudentsBySchoolQuery_1 = require("../../services/studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQuery");
const GetStudentsByIdQuery_1 = require("../../services/studentsvc/handler/Read/ById/GetStudentsByIdQuery");
const UpdateStudentRequest_1 = require("../../services/studentsvc/models/Update/UpdateStudentRequest");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, dateOfBirth, schoolId, classe } = req.body;
        if (isNaN(Date.parse(dateOfBirth))) {
            res.status(400).json({ message: "Invalid date format. Use ISO 8601." });
            return;
        }
        const dob = new Date(dateOfBirth);
        const command = new CreateStudentCommand_1.CreateStudentCommand(nom, prenom, dob, schoolId, classe);
        command.parentId = req.body.parentId;
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Login error:", error);
    }
});
exports.createStudent = createStudent;
const updateStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const data = req.body;
        const error = (0, UpdateStudentRequest_1.validateStudentData)(data);
        if (error) {
            res.status(error.statusCode).json(error.statusCode);
        }
        console.log("HOLA");
        const command = new UpdateStudentCommand_1.UpdateStudentCommand(id, data);
        command.student.classeId = (_a = data.classeId) !== null && _a !== void 0 ? _a : null;
        command.student.parentId = (_b = data.parentId) !== null && _b !== void 0 ? _b : null;
        const updated = yield Mediator_1.mediator.send(command);
        res.status(200).json(updated);
        return;
    }
    catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const deleteStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const command = new DeleteStudentCommand_1.DeleteStudentCommand(id);
        yield Mediator_1.mediator.send(command);
        res.status(204).send();
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = new GetStudentsByIdQuery_1.GetStudentsByIdQuery(id);
        const result = yield Mediator_1.mediator.send(query);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Get by class error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const getStudentsBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.StudentController = {
    createStudent: exports.createStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    getStudentsBySchool,
};
