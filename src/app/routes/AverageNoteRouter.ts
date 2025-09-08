import { Router } from "express";
import { NoteAverageController } from "../controllers/AverageNoteController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const noteAverageRouter = Router();

/**
 * Route to get the average note for a specific discipline.
 * GET /api/schools/:schoolId/notes/averages/disciplines/:disciplineId
 */
noteAverageRouter.get(
  "/:schoolId/notes/averages/disciplines/:disciplineId",
  authenticateToken,
  NoteAverageController.getDisciplineAverage
);

/**
 * Route to get the average note for a specific class.
 * GET /api/schools/:schoolId/notes/averages/classes/:classeId
 */
noteAverageRouter.get(
  "/:schoolId/notes/averages/classes/:classeId",
  authenticateToken,
  NoteAverageController.getClasseAverage
);

/**
 * Route to get the average note for a specific student.
 * GET /api/schools/:schoolId/notes/averages/students/:studentId
 */
noteAverageRouter.get(
  "/:schoolId/notes/averages/students/:studentId",
  authenticateToken,
  NoteAverageController.getStudentAverage
);

/**
 * Route to get the average note for an entire school.
 * GET /api/schools/:schoolId/notes/averages/schools
 */
noteAverageRouter.get(
  "/:schoolId/notes/averages/schools",
  authenticateToken,
  NoteAverageController.getSchoolAverage
);

export default noteAverageRouter;
