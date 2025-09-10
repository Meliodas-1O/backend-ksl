import { RequestHandler } from "express";
import {
  CreateNoteCommand,
  UpdateNoteCommand,
  DeleteNoteCommand,
  FindNoteByIdQuery,
  FindNotesByStudentIdQuery,
  FindNotesByClasseIdQuery,
  FindNotesByDisciplineIdQuery,
  FindNotesBySchoolIdQuery,
  FindNotesByTeacherIdQuery,
} from "../../services/notesvc/NoteCommands";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { mediator } from "../../common/mediator/Mediator";

/**
 * Validates and sanitizes the input for creating a note.
 * Throws an error with a reason if validation fails.
 */
const validateCreateNoteInput = (body: any, params: any) => {
  const {
    studentId,
    disciplineId,
    professeurId,
    type,
    devoir,
    note,
    date,
    coefficient,
    appreciation,
  } = body;
  const { schoolId, classeId } = params;

  if (!schoolId || typeof schoolId !== "string") {
    throw new Error("Invalid schoolId provided.");
  }
  if (!classeId || typeof classeId !== "string") {
    throw new Error("Invalid classeId provided.");
  }
  if (!studentId || typeof studentId !== "string") {
    throw new Error("Invalid studentId provided.");
  }
  if (!disciplineId || typeof disciplineId !== "string") {
    throw new Error("Invalid disciplineId provided.");
  }
  if (!professeurId || typeof professeurId !== "string") {
    throw new Error("Invalid disciplineId provided.");
  }

  if (!type || typeof type !== "string" || type.trim() === "") {
    throw new Error("Invalid or empty type provided.");
  }
  if (typeof devoir !== "boolean") {
    throw new Error("Devoir must be a boolean.");
  }
  if (typeof note !== "number" || note < 0 || note > 20) {
    throw new Error("Note must be a number between 0 and 20.");
  }
  if (typeof coefficient !== "number" || coefficient <= 0) {
    throw new Error("Coefficient must be a positive number.");
  }
  if (!date || isNaN(new Date(date).getTime())) {
    throw new Error("Invalid date provided.");
  }
  if (appreciation && typeof appreciation !== "string") {
    throw new Error("Appreciation must be a string.");
  }

  // Basic sanitization
  body.type = type.trim();
  if (appreciation) {
    body.appreciation = appreciation.trim();
  }
};

/**
 * Validates and sanitizes the input for updating a note.
 * Throws an error with a reason if validation fails.
 */
const validateUpdateNoteInput = (body: any, params: any) => {
  const { id, schoolId } = params;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid note ID provided.");
  }
  if (!schoolId || typeof schoolId !== "string") {
    throw new Error("Invalid school ID provided.");
  }

  if (Object.keys(body).length === 0) {
    throw new Error("Request body cannot be empty for update.");
  }

  // Validate and sanitize specific fields if they exist
  if (body.type && (typeof body.type !== "string" || body.type.trim() === "")) {
    throw new Error("Invalid type provided.");
  }
  if (body.devoir && typeof body.devoir !== "boolean") {
    throw new Error("Devoir must be a boolean.");
  }
  if (body.note && (typeof body.note !== "number" || body.note < 0 || body.note > 20)) {
    throw new Error("Note must be a number between 0 and 20.");
  }
  if (body.date && isNaN(new Date(body.date).getTime())) {
    throw new Error("Invalid date provided.");
  }
  if (body.coefficient && (typeof body.coefficient !== "number" || body.coefficient <= 0)) {
    throw new Error("Coefficient must be a positive number.");
  }
  if (body.appreciation && typeof body.appreciation !== "string") {
    throw new Error("Appreciation must be a string.");
  }
};

/**
 * Validates the input for deleting and querying notes.
 * Throws an error with a reason if validation fails.
 */
const validateNoteIdAndSchoolId = (id: string, schoolId: string) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid note ID provided.");
  }
  if (!schoolId || typeof schoolId !== "string") {
    throw new Error("Invalid school ID provided.");
  }
};

const validateSchoolId = (schoolId: string) => {
  if (!schoolId || typeof schoolId !== "string") {
    throw new Error("Invalid school ID provided.");
  }
};

const validateStudentId = (studentId: string, schoolId: string) => {
  if (!studentId || typeof studentId !== "string") {
    throw new Error("Invalid student ID provided.");
  }
  validateSchoolId(schoolId);
};

const validateClasseId = (classeId: string, schoolId: string) => {
  if (!classeId || typeof classeId !== "string") {
    throw new Error("Invalid class ID provided.");
  }
  validateSchoolId(schoolId);
};

const validateDisciplineId = (disciplineId: string, schoolId: string) => {
  if (!disciplineId || typeof disciplineId !== "string") {
    throw new Error("Invalid discipline ID provided.");
  }
  validateSchoolId(schoolId);
};

/**
 * =========================================================================
 *
 * COMMANDS (MUTATIONS) CONTROLLERS
 *
 * =========================================================================
 */

/**
 * Creates a new note record.
 */
const createNote: RequestHandler = async (req, res) => {
  try {
    validateCreateNoteInput(req.body, req.params);
    const command = new CreateNoteCommand(
      req.params.schoolId,
      req.params.classeId,
      req.body.studentId,
      req.body.disciplineId,
      req.body.professeurId,
      req.body.type,
      req.body.devoir,
      req.body.note,
      new Date(req.body.date),
      req.body.coefficient,
      req.body.appreciation ?? null,
      req.body.semester ?? null
    );
    const result = await mediator.send(command);
    res.status(StatusCode.CREATED).json(result);
  } catch (error: any) {
    console.error("Create note error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * Updates an existing note record.
 */
const updateNote: RequestHandler = async (req, res) => {
  try {
    validateUpdateNoteInput(req.body, req.params);
    const command = new UpdateNoteCommand(req.params.id, req.params.schoolId, req.body);
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update note error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * Deletes a note record.
 */
const deleteNote: RequestHandler = async (req, res) => {
  try {
    validateNoteIdAndSchoolId(req.params.id, req.params.schoolId);
    const command = new DeleteNoteCommand(req.params.id, req.params.schoolId);
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Delete note error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * =========================================================================
 *
 * QUERIES (FETCHING) CONTROLLERS
 *
 * =========================================================================
 */

/**
 * Finds a single note by ID.
 */
const findNoteById: RequestHandler = async (req, res) => {
  try {
    validateNoteIdAndSchoolId(req.params.id, req.params.schoolId);
    const query = new FindNoteByIdQuery(req.params.id, req.params.schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find note by ID error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * Finds all notes for a specific student.
 */
const findNotesByStudentId: RequestHandler = async (req, res) => {
  try {
    validateStudentId(req.params.studentId, req.params.schoolId);
    const query = new FindNotesByStudentIdQuery(req.params.studentId, req.params.schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find notes by student ID error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * Finds all notes for a specific class.
 */
const findNotesByClasseId: RequestHandler = async (req, res) => {
  try {
    validateClasseId(req.params.classeId, req.params.schoolId);
    const query = new FindNotesByClasseIdQuery(req.params.classeId, req.params.schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find notes by class ID error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * Finds all notes for a specific discipline.
 */
const findNotesByDisciplineId: RequestHandler = async (req, res) => {
  try {
    validateDisciplineId(req.params.disciplineId, req.params.schoolId);
    const query = new FindNotesByDisciplineIdQuery(req.params.disciplineId, req.params.schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find notes by discipline ID error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * Finds all notes for a specific discipline.
 */
const findNotesByTeacherId: RequestHandler = async (req, res) => {
  try {
    validateDisciplineId(req.params.teacherId, req.params.schoolId);
    const query = new FindNotesByTeacherIdQuery(req.params.teacherId, req.params.schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find notes by discipline ID error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

/**
 * Finds all notes for a specific school.
 */
const findNotesBySchoolId: RequestHandler = async (req, res) => {
  try {
    validateSchoolId(req.params.schoolId);
    const query = new FindNotesBySchoolIdQuery(req.params.schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find notes by school ID error:", error);
    res.status(StatusCode.BAD_REQUEST).json({ reason: error.message || "Invalid request." });
  }
};

export const NoteController = {
  createNote,
  updateNote,
  deleteNote,
  findNoteById,
  findNotesByStudentId,
  findNotesByClasseId,
  findNotesByDisciplineId,
  findNotesByTeacherId,
  findNotesBySchoolId,
};
