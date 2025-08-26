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
exports.DisciplineController = void 0;
const Commands_1 = require("../../services/courssvc/Commands");
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const Mediator_1 = require("../../common/mediator/Mediator");
const getAllDisciplines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = new Commands_1.GetAllDisciplinesQuery(req.params.schoolId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get all disciplines error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const getDisciplineById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = new Commands_1.GetDisciplineByIdQuery(req.params.schoolId, req.params.disciplineId);
        const result = yield Mediator_1.mediator.send(query);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Get all disciplines error:", error);
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
exports.DisciplineController = {
    getAllDisciplines,
    getDisciplineById,
};
