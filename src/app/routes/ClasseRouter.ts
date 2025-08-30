import { Router } from "express";
import { ClasseController } from "../controllers/ClasseController";
import { authenticateToken } from "../middlewares/AuthenticateToken";
import { authorizeRole } from "../middlewares/AuthenticateRole";

const classeRouter = Router();

// --- Command Routes (Mutations) ---
// Create a new classe
classeRouter.post(
  "/:schoolId/classes",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  ClasseController.createClasse
);
// Update an existing classe by ID
classeRouter.put(
  "/:schoolId/classes/:classeId",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  ClasseController.updateClasse
);
// Delete a classe by ID
classeRouter.delete(
  "/:schoolId/classes/:classeId",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  ClasseController.deleteClasse
);
// Assign a professor to a classe
classeRouter.put(
  "/:schoolId/classes/:classeId/professors",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  ClasseController.assignProfesseurToClasse
);
// Assign a subject (matiere) to a classe
classeRouter.put(
  "/:schoolId/classes/:classeId/matieres",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  ClasseController.assignMatiereToClasse
);

// --- Query Routes (Reads) ---
// Get all classes
classeRouter.get(
  "/:schoolId/classes",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  ClasseController.getAllClasses
);
// Get a specific classe by ID
classeRouter.get(
  "/:schoolId/classes/:classeId",
  authenticateToken,
  ClasseController.getClasseById
);
// Get all students for a specific classe
classeRouter.get(
  "/:schoolId/classes/:classeId/students",
  authenticateToken,
  ClasseController.getStudentsInClasse
);
// Get all professors for a specific classe
classeRouter.get(
  "/:schoolId/classes/:classeId/professors",
  authenticateToken,
  ClasseController.getProfessorsInClasse
);
// Get all parents of students in a specific classe
classeRouter.get(
  "/:schoolId/classes/:classeId/parents",
  authenticateToken,
  ClasseController.getParentsInClasse
);
// Get all disciplines for a specific classe
classeRouter.get(
  "/:schoolId/classes/:classeId/disciplines",
  authenticateToken,
  ClasseController.getDisciplinesInClasse
);

export default classeRouter;
