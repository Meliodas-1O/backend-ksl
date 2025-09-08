import { RequestHandler } from "express";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { mediator } from "../../common/mediator/Mediator";
import {
  FindDisciplineAverageQuery,
  FindClasseAverageQuery,
  FindStudentAverageQuery,
  FindSchoolAverageQuery,
} from "../../services/notesvc/AverageNoteCommand";

// =========================================================================
//
// HELPER VALIDATION FUNCTIONS
//
// =========================================================================

const validateIdAndSchoolId = (
  id: string | undefined,
  schoolId: string | undefined,
  idType: string
) => {
  if (!schoolId) {
    throw new Error("School ID is required.");
  }
  if (!id) {
    throw new Error(`${idType} ID is required.`);
  }
};

// =========================================================================
//
// AVERAGE QUERIES CONTROLLERS
//
// =========================================================================

/**
 * Finds the average note for a specific discipline.
 */
const getDisciplineAverage: RequestHandler = async (req, res) => {
  try {
    validateIdAndSchoolId(req.params.disciplineId, req.params.schoolId, "Discipline");
    const query = new FindDisciplineAverageQuery(req.params.disciplineId!, req.params.schoolId!);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get discipline average error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: error.message || "Internal server error." });
  }
};

/**
 * Finds the average note for a specific class.
 */
const getClasseAverage: RequestHandler = async (req, res) => {
  try {
    validateIdAndSchoolId(req.params.classeId, req.params.schoolId, "Classe");
    const query = new FindClasseAverageQuery(req.params.classeId!, req.params.schoolId!);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get class average error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: error.message || "Internal server error." });
  }
};

/**
 * Finds the average note for a specific student.
 */
const getStudentAverage: RequestHandler = async (req, res) => {
  try {
    validateIdAndSchoolId(req.params.studentId, req.params.schoolId, "Student");
    const query = new FindStudentAverageQuery(req.params.studentId!, req.params.schoolId!);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get student average error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: error.message || "Internal server error." });
  }
};

/**
 * Finds the average note for an entire school.
 */
const getSchoolAverage: RequestHandler = async (req, res) => {
  try {
    if (!req.params.schoolId) {
      throw new Error("School ID is required.");
    }
    const query = new FindSchoolAverageQuery(req.params.schoolId!);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get school average error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: error.message || "Internal server error." });
  }
};

export const NoteAverageController = {
  getDisciplineAverage,
  getClasseAverage,
  getStudentAverage,
  getSchoolAverage,
};
