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
exports.ClasseController = void 0;
const NotFoundError_1 = require("../../common/application/dto/NotFoundError");
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const ValidationError_1 = require("../../common/application/dto/ValidationError");
const Mediator_1 = require("../../common/mediator/Mediator");
const Commands_1 = require("../../services/classesvc/handler/Commands");
// ---------------------------------------------
// Command Handlers (Mutations)
// ---------------------------------------------
const createClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, niveau } = req.body;
        const command = new Commands_1.CreateClasseCommand(nom, niveau, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.CREATED).json(result);
    }
    catch (error) {
        console.error("Create classe error:", error);
        if (error instanceof ValidationError_1.ValidationError) {
            res.status(StatusCode_1.StatusCode.BAD_REQUEST).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const updateClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId } = req.params;
        const { nom, niveau } = req.body;
        const command = new Commands_1.UpdateClasseCommand(classeId, nom, niveau, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Classe with ID ${classeId} not found.`);
        }
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Update classe error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const deleteClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId } = req.params;
        const command = new Commands_1.DeleteClasseCommand(classeId);
        yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json({ message: "Classe deleted successfully." });
    }
    catch (error) {
        console.error("Delete classe error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const assignProfesseurToClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId } = req.params;
        const { professeurId } = req.body;
        const command = new Commands_1.AssignProfesseurToClasseCommand(classeId, professeurId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Assign professor to classe error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const assignMatiereToClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId, schoolId } = req.params;
        const { matiereId } = req.body;
        const command = new Commands_1.AssignMatiereToClasseCommand(classeId, matiereId, schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Assign matiere to classe error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Query Handlers (Reads)
// ---------------------------------------------
const getAllClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = new Commands_1.GetAllClassesQuery(req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get all classes error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getClasseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId } = req.params;
        const query = new Commands_1.GetClasseByIdQuery(classeId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Classe with ID ${classeId} not found.`);
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
const getStudentsInClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId, schoolId } = req.params;
        const query = new Commands_1.GetStudentsInClasseQuery(classeId, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get students in classe error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getProfessorsInClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId } = req.params;
        const query = new Commands_1.GetProfessorsInClasseQuery(classeId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get professors in classe error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getParentsInClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId } = req.params;
        const query = new Commands_1.GetParentsInClasseQuery(classeId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get parents in classe error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getDisciplinesInClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId } = req.params;
        const query = new Commands_1.GetDisciplinesInClasseQuery(classeId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get disciplines in classe error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
exports.ClasseController = {
    createClasse,
    updateClasse,
    deleteClasse,
    assignMatiereToClasse,
    assignProfesseurToClasse,
    getAllClasses,
    getClasseById,
    getStudentsInClasse,
    getProfessorsInClasse,
    getParentsInClasse,
    getDisciplinesInClasse,
};
