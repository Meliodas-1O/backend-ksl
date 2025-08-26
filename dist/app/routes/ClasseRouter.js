"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClasseController_1 = require("../controllers/ClasseController");
const classeRouter = (0, express_1.Router)();
// --- Command Routes (Mutations) ---
// Create a new classe
classeRouter.post("/:schoolId/classes", ClasseController_1.ClasseController.createClasse);
// Update an existing classe by ID
classeRouter.put("/:schoolId/classes/:classeId", ClasseController_1.ClasseController.updateClasse);
// Delete a classe by ID
classeRouter.delete("/:schoolId/classes/:classeId", ClasseController_1.ClasseController.deleteClasse);
// Assign a professor to a classe
classeRouter.put("/:schoolId/classes/:classeId/professors", ClasseController_1.ClasseController.assignProfesseurToClasse);
// Assign a subject (matiere) to a classe
classeRouter.put("/:schoolId/classes/:classeId/matieres", ClasseController_1.ClasseController.assignMatiereToClasse);
// --- Query Routes (Reads) ---
// Get all classes
classeRouter.get("/:schoolId/classes", ClasseController_1.ClasseController.getAllClasses);
// Get a specific classe by ID
classeRouter.get("/:schoolId/classes/:classeId", ClasseController_1.ClasseController.getClasseById);
// Get all students for a specific classe
classeRouter.get("/:schoolId/classes/:classeId/students", ClasseController_1.ClasseController.getStudentsInClasse);
// Get all professors for a specific classe
classeRouter.get("/:schoolId/classes/:classeId/professors", ClasseController_1.ClasseController.getProfessorsInClasse);
// Get all parents of students in a specific classe
classeRouter.get("/:schoolId/classes/:classeId/parents", ClasseController_1.ClasseController.getParentsInClasse);
// Get all disciplines for a specific classe
classeRouter.get("/:schoolId/classes/:classeId/disciplines", ClasseController_1.ClasseController.getDisciplinesInClasse);
exports.default = classeRouter;
