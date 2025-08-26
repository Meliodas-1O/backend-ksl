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
exports.UserController = void 0;
const Commands_1 = require("../../services/usersvc/handlers/Commands");
const NotFoundError_1 = require("../../common/application/dto/NotFoundError");
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const Mediator_1 = require("../../common/mediator/Mediator");
const updateParentFromAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, email, telephone } = req.body;
        const command = new Commands_1.UpdateParentFromAdminQuery(req.params.parentId, nom, prenom, email, telephone, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Update parent error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const updateTeacherFromAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, email, telephone, classes } = req.body;
        console.log("HOLA", req.body);
        const command = new Commands_1.UpdateTeacherFromAdminQuery(req.params.teacherId, nom, prenom, email, telephone, classes, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Update teacher error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const updateSelfTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, email, telephone, biographie, adresse } = req.body;
        const command = new Commands_1.UpdateSelfTeacherQuery(req.params.teacherId, nom, prenom, email, telephone, adresse, biographie, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Update teacher error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
const updateSelfParent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, email, telephone, profession, adresse } = req.body;
        const command = new Commands_1.UpdateSelfParentQuery(req.params.parentId, nom, prenom, email, telephone, profession, adresse, req.params.schoolId);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json(result);
    }
    catch (error) {
        console.error("Update parent error:", error);
        if (error instanceof NotFoundError_1.NotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
exports.UserController = {
    updateParentFromAdmin,
    updateSelfParent,
    updateTeacherFromAdmin,
    updateSelfTeacher,
};
