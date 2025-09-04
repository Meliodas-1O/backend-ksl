import { Router } from "express";
import { CoursController } from "../controllers/CoursController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const coursRouter = Router();

// ---------------------------------------------
// Command Routes (Mutations)
// ---------------------------------------------

// Create a new course
coursRouter.post("/:schoolId/cours", authenticateToken, CoursController.createCours);

// Update a course by ID
coursRouter.put("/:schoolId/cours/:coursId", authenticateToken, CoursController.updateCours);

// Delete a course by ID
coursRouter.delete("/:schoolId/cours/:coursId", authenticateToken, CoursController.deleteCours);

// Assign a professor to a course
coursRouter.post(
  "/:schoolId/cours/:coursId/professeur",
  authenticateToken,
  CoursController.assignProfesseurToCours
);

// Assign a subject to a course
coursRouter.post(
  "/:schoolId/cours/:coursId/matiere",
  authenticateToken,
  CoursController.assignMatiereToCours
);

// ---------------------------------------------
// Query Routes (Reads)
// ---------------------------------------------

// Get all courses in a school
coursRouter.get("/:schoolId/cours", authenticateToken, CoursController.getAllCours);

// Get a course by its ID
coursRouter.get("/:schoolId/cours/:coursId", authenticateToken, CoursController.getCoursById);

// Get courses by professor
coursRouter.get(
  "/:schoolId/cours/professeur/:professeurId",
  authenticateToken,
  CoursController.getCoursByProfesseur
);

// Get courses by class
coursRouter.get(
  "/:schoolId/cours/classe/:classeId",
  authenticateToken,
  CoursController.getCoursByClasse
);

// Get courses by day (e.g., Monday, Tuesday)
coursRouter.get("/:schoolId/cours/day/:day", authenticateToken, CoursController.getCoursByDay);

// Get courses by day and hour (e.g., Monday, 10 AM)
coursRouter.get(
  "/:schoolId/cours/day/:day/hour/:hour",
  authenticateToken,
  CoursController.getCoursByDayAndHour
);

// Get courses by week (e.g., start and end dates)
coursRouter.get(
  "/:schoolId/cours/week/:weekStart/:weekEnd",
  authenticateToken,
  CoursController.getCoursByWeek
);

export default coursRouter;
