"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CoursController_1 = require("../controllers/CoursController");
const coursRouter = (0, express_1.Router)();
// ---------------------------------------------
// Command Routes (Mutations)
// ---------------------------------------------
// Create a new course
coursRouter.post("/:schoolId/cours", CoursController_1.CoursController.createCours);
// Update a course by ID
coursRouter.put("/:schoolId/cours/:coursId", CoursController_1.CoursController.updateCours);
// Delete a course by ID
coursRouter.delete("/:schoolId/cours/:coursId", CoursController_1.CoursController.deleteCours);
// Assign a professor to a course
coursRouter.post("/:schoolId/cours/:coursId/professeur", CoursController_1.CoursController.assignProfesseurToCours);
// Assign a subject to a course
coursRouter.post("/:schoolId/cours/:coursId/matiere", CoursController_1.CoursController.assignMatiereToCours);
// ---------------------------------------------
// Query Routes (Reads)
// ---------------------------------------------
// Get all courses in a school
coursRouter.get("/:schoolId/cours", CoursController_1.CoursController.getAllCours);
// Get a course by its ID
coursRouter.get("/:schoolId/cours/:coursId", CoursController_1.CoursController.getCoursById);
// Get courses by professor
coursRouter.get("/:schoolId/cours/professeur/:professeurId", CoursController_1.CoursController.getCoursByProfesseur);
// Get courses by class
coursRouter.get("/:schoolId/cours/classe/:classeId", CoursController_1.CoursController.getCoursByClasse);
// Get courses by day (e.g., Monday, Tuesday)
coursRouter.get("/:schoolId/cours/day/:day", CoursController_1.CoursController.getCoursByDay);
// Get courses by day and hour (e.g., Monday, 10 AM)
coursRouter.get("/:schoolId/cours/day/:day/hour/:hour", CoursController_1.CoursController.getCoursByDayAndHour);
// Get courses by week (e.g., start and end dates)
coursRouter.get("/:schoolId/cours/week/:weekStart/:weekEnd", CoursController_1.CoursController.getCoursByWeek);
exports.default = coursRouter;
