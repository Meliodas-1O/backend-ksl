import { Router } from "express";
import { ClasseController } from "../controllers/ClasseController";

const classeRouter = Router();

// --- Command Routes (Mutations) ---
// Create a new classe
classeRouter.post("/:schoolId/classes", ClasseController.createClasse);
// Update an existing classe by ID
classeRouter.put("/:schoolId/classes/:classeId", ClasseController.updateClasse);
// Delete a classe by ID
classeRouter.delete("/:schoolId/classes/:classeId", ClasseController.deleteClasse);
// Assign a professor to a classe
classeRouter.put(
  "/:schoolId/classes/:classeId/professors",
  ClasseController.assignProfesseurToClasse
);
// Assign a subject (matiere) to a classe
classeRouter.put("/:schoolId/classes/:classeId/matieres", ClasseController.assignMatiereToClasse);

// --- Query Routes (Reads) ---
// Get all classes
classeRouter.get("/:schoolId/classes", ClasseController.getAllClasses);
// Get a specific classe by ID
classeRouter.get("/:schoolId/classes/:classeId", ClasseController.getClasseById);
// Get all students for a specific classe
classeRouter.get("/:schoolId/classes/:classeId/students", ClasseController.getStudentsInClasse);
// Get all professors for a specific classe
classeRouter.get("/:schoolId/classes/:classeId/professors", ClasseController.getProfessorsInClasse);
// Get all parents of students in a specific classe
classeRouter.get("/:schoolId/classes/:classeId/parents", ClasseController.getParentsInClasse);
// Get all disciplines for a specific classe
classeRouter.get(
  "/:schoolId/classes/:classeId/disciplines",
  ClasseController.getDisciplinesInClasse
);

export default classeRouter;
