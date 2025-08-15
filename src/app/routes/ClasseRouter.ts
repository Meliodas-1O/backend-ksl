import { Router } from "express";
import { ClasseController } from "../controllers/ClasseController";

const classeRouter = Router();

// --- Command Routes (Mutations) ---
// Create a new classe
classeRouter.post("/:schoolId/classes", ClasseController.createClasse);
// Update an existing classe by ID
classeRouter.put("/:classeId", ClasseController.updateClasse);
// Delete a classe by ID
classeRouter.delete("/:classeId", ClasseController.deleteClasse);
// Assign a professor to a classe
classeRouter.put("/:classeId/professors", ClasseController.assignProfesseurToClasse);
// Assign a subject (matiere) to a classe
classeRouter.put("/:classeId/matieres", ClasseController.assignMatiereToClasse);

// --- Query Routes (Reads) ---
// Get all classes
classeRouter.get("/", ClasseController.getAllClasses);
// Get a specific classe by ID
classeRouter.get("/:classeId", ClasseController.getClasseById);
// Get all students for a specific classe
classeRouter.get("/:classeId/students", ClasseController.getStudentsInClasse);
// Get all professors for a specific classe
classeRouter.get("/:classeId/professors", ClasseController.getProfessorsInClasse);
// Get all parents of students in a specific classe
classeRouter.get("/:classeId/parents", ClasseController.getParentsInClasse);
// Get all disciplines for a specific classe
classeRouter.get("/:classeId/disciplines", ClasseController.getDisciplinesInClasse);

export default classeRouter;
