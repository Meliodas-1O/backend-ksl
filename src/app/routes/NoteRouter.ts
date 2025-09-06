import { Router } from "express";
import { NoteController } from "../controllers/NoteController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const noteRouter = Router();

// =========================================================================
//
// COMMANDS (MUTATIONS) ROUTES
//
// =========================================================================

/**
 * Route to create a new note.
 * POST /api/schools/:schoolIdclasses/:classeId/notes
 */
noteRouter.post("/:schoolId/classes/:classeId/notes", authenticateToken, NoteController.createNote);

/**
 * Route to update an existing note.
 * PATCH /api/schools/:schoolId/notes/:id
 */
noteRouter.patch("/:schoolId/notes/:id", authenticateToken, NoteController.updateNote);

/**
 * Route to delete a note.
 * DELETE /api/schools/:schoolId/notes/:id
 */
noteRouter.delete("/:schoolId/notes/:id", authenticateToken, NoteController.deleteNote);

// =========================================================================
//
// QUERIES (FETCHING) ROUTES
//
// =========================================================================

/**
 * Route to get a single note by its ID.
 * GET /api/schools/:schoolId/notes/:id
 */
noteRouter.get("/:schoolId/notes/:id", authenticateToken, NoteController.findNoteById);

/**
 * Route to get all notes for a specific student.
 * GET /api/schools/:schoolId/notes/students/:studentId
 */
noteRouter.get(
  "/:schoolId/notes/students/:studentId",
  authenticateToken,
  NoteController.findNotesByStudentId
);

/**
 * Route to get all notes for a specific class.
 * GET /api/schools/:schoolId/notes/classes/:classeId
 */
noteRouter.get(
  "/:schoolId/notes/classes/:classeId",
  authenticateToken,
  NoteController.findNotesByClasseId
);

/**
 * Route to get all notes for a specific discipline.
 * GET /api/schools/:schoolId/notes/disciplines/:disciplineId
 */
noteRouter.get(
  "/:schoolId/notes/disciplines/:disciplineId",
  authenticateToken,
  NoteController.findNotesByDisciplineId
);

/**
 * Route to get all notes for a specific teacher.
 * Note: The path parameter is named `professeurId` to match your database schema.
 * GET /api/schools/:schoolId/notes/professors/:professeurId
 */
noteRouter.get(
  "/:schoolId/notes/professors/:teacherId",
  authenticateToken,
  NoteController.findNotesByTeacherId
);

/**
 * Route to get all notes for a specific school.
 * GET /api/schools/:schoolId/notes
 */
noteRouter.get("/:schoolId/notes", authenticateToken, NoteController.findNotesBySchoolId);

export default noteRouter;
