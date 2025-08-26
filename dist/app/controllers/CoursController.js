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
exports.CoursController = void 0;
const NotFoundError_1 = require("../../common/application/dto/NotFoundError");
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const ValidationError_1 = require("../../common/application/dto/ValidationError");
const Mediator_1 = require("../../common/mediator/Mediator");
const Commands_1 = require("../../services/courssvc/Commands");
// ---------------------------------------------
// Command Handlers (Mutations)
// ---------------------------------------------
const createCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jour, heure, disciplineId, professeurId, classeId } = req.body;
        const command = new Commands_1.CreateCoursCommand(jour, heure, disciplineId, professeurId, classeId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.CREATED).json(result);
    }
    catch (error) {
        console.error("Create course error:", error);
        if (error instanceof ValidationError_1.ValidationError) {
            res.status(StatusCode_1.StatusCode.BAD_REQUEST).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const updateCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coursId } = req.params;
        const { jour, heure, disciplineId, professeurId, classeId } = req.body;
        const command = new Commands_1.UpdateCoursCommand(coursId, jour, heure, disciplineId, professeurId, classeId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Course with ID ${coursId} not found.`);
        }
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Update course error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const deleteCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coursId } = req.params;
        const command = new Commands_1.DeleteCoursCommand(coursId);
        yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json({ message: "Course deleted successfully." });
    }
    catch (error) {
        console.error("Delete course error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const assignProfesseurToCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coursId } = req.params;
        const { professeurId } = req.body;
        const command = new Commands_1.AssignProfesseurToCoursCommand(coursId, professeurId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Assign professor to course error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const assignMatiereToCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coursId, schoolId } = req.params;
        const { matiereId } = req.body;
        const command = new Commands_1.AssignMatiereToCoursCommand(coursId, matiereId, schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Assign matiere to course error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Query Handlers (Reads)
// ---------------------------------------------
const getAllCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = new Commands_1.GetAllCoursQuery(req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get all courses error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getCoursById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coursId } = req.params;
        const query = new Commands_1.GetCoursByIdQuery(coursId, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(`Course with ID ${coursId} not found.`);
        }
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get course by ID error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getCoursByProfesseur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professeurId, schoolId } = req.params;
        const query = new Commands_1.GetCoursByProfesseurQuery(professeurId, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get courses by professor error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getCoursByClasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classeId, schoolId } = req.params;
        const query = new Commands_1.GetCoursByClasseQuery(classeId, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get courses by classe error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getCoursByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { day, schoolId } = req.params;
        const query = new Commands_1.GetCoursByDayQuery(day, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get courses by day error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getCoursByDayAndHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { day, hour, schoolId } = req.params;
        const query = new Commands_1.GetCoursByDayAndHourQuery(day, hour, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get courses by day and hour error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getCoursByWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { weekStart, weekEnd, schoolId } = req.params;
        // Convert the week start and end to Date objects
        const startDate = new Date(weekStart);
        const endDate = new Date(weekEnd);
        // Ensure valid dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            res.status(400).json({ reason: "Invalid date format." });
            return;
        }
        const query = new Commands_1.GetCoursByWeekQuery(startDate, endDate, schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get courses by week error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
// ---------------------------------------------
// Exporting the Controller
// ---------------------------------------------
exports.CoursController = {
    createCours,
    updateCours,
    deleteCours,
    assignProfesseurToCours,
    assignMatiereToCours,
    getAllCours,
    getCoursById,
    getCoursByProfesseur,
    getCoursByClasse,
    getCoursByDay,
    getCoursByDayAndHour,
    getCoursByWeek,
};
