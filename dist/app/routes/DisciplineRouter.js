"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DisciplineController_1 = require("../../app/controllers/DisciplineController");
const express_1 = require("express");
const disciplineRouter = (0, express_1.Router)();
disciplineRouter.get("/:schoolId/disciplines", DisciplineController_1.DisciplineController.getAllDisciplines);
disciplineRouter.get("/:schoolId/disciplines/:disciplineId", DisciplineController_1.DisciplineController.getDisciplineById);
exports.default = disciplineRouter;
