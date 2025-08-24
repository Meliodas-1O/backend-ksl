import { Cours } from "../../common/domain/entities/Cours";
import { NotFoundError } from "../../common/application/dto/NotFoundError";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { ValidationError } from "../../common/application/dto/ValidationError";
import { mediator } from "../../common/mediator/Mediator";
import { RequestHandler } from "express";
import {
  CreateCoursCommand,
  UpdateCoursCommand,
  DeleteCoursCommand,
  AssignProfesseurToCoursCommand,
  AssignMatiereToCoursCommand,
  GetAllCoursQuery,
  GetCoursByIdQuery,
  GetCoursByProfesseurQuery,
  GetCoursByClasseQuery,
  GetCoursByDayQuery,
  GetCoursByDayAndHourQuery,
  GetCoursByWeekQuery,
} from "../../services/courssvc/Commands";

// ---------------------------------------------
// Command Handlers (Mutations)
// ---------------------------------------------

const createCours: RequestHandler = async (req, res) => {
  try {
    const { jour, heure, disciplineId, professeurId, classeId } = req.body;
    const command = new CreateCoursCommand(
      jour,
      heure,
      disciplineId,
      professeurId,
      classeId,
      req.params.schoolId
    );
    const result: Cours = await mediator.send(command);
    res.status(StatusCode.CREATED).json(result);
  } catch (error: any) {
    console.error("Create course error:", error);
    if (error instanceof ValidationError) {
      res.status(StatusCode.BAD_REQUEST).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const updateCours: RequestHandler = async (req, res) => {
  try {
    const { coursId } = req.params;
    const { jour, heure, disciplineId, professeurId, classeId } = req.body;
    const command = new UpdateCoursCommand(
      coursId,
      jour,
      heure,
      disciplineId,
      professeurId,
      classeId,
      req.params.schoolId
    );
    const result: Cours | null = await mediator.send(command);

    if (!result) {
      throw new NotFoundError(`Course with ID ${coursId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update course error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const deleteCours: RequestHandler = async (req, res) => {
  try {
    const { coursId } = req.params;
    const command = new DeleteCoursCommand(coursId);
    await mediator.send(command);
    res.status(StatusCode.SUCCESS).json({ message: "Course deleted successfully." });
  } catch (error: any) {
    console.error("Delete course error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const assignProfesseurToCours: RequestHandler = async (req, res) => {
  try {
    const { coursId } = req.params;
    const { professeurId } = req.body;
    const command = new AssignProfesseurToCoursCommand(coursId, professeurId, req.params.schoolId);
    const result: Cours = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Assign professor to course error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const assignMatiereToCours: RequestHandler = async (req, res) => {
  try {
    const { coursId, schoolId } = req.params;
    const { matiereId } = req.body;
    const command = new AssignMatiereToCoursCommand(coursId, matiereId, schoolId);
    const result: Cours = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Assign matiere to course error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Query Handlers (Reads)
// ---------------------------------------------

const getAllCours: RequestHandler = async (req, res) => {
  try {
    const query = new GetAllCoursQuery(req.params.schoolId);
    const result: Cours[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get all courses error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getCoursById: RequestHandler = async (req, res) => {
  try {
    const { coursId } = req.params;
    const query = new GetCoursByIdQuery(coursId, req.params.schoolId);
    const result: Cours | null = await mediator.send(query);

    if (!result) {
      throw new NotFoundError(`Course with ID ${coursId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get course by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getCoursByProfesseur: RequestHandler = async (req, res) => {
  try {
    const { professeurId, schoolId } = req.params;
    const query = new GetCoursByProfesseurQuery(professeurId, schoolId);
    const result: Cours[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get courses by professor error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getCoursByClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId, schoolId } = req.params;
    const query = new GetCoursByClasseQuery(classeId, schoolId);
    const result: Cours[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get courses by classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getCoursByDay: RequestHandler = async (req, res) => {
  try {
    const { day, schoolId } = req.params;
    const query = new GetCoursByDayQuery(day, schoolId);
    const result: Cours[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get courses by day error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getCoursByDayAndHour: RequestHandler = async (req, res) => {
  try {
    const { day, hour, schoolId } = req.params;
    const query = new GetCoursByDayAndHourQuery(day, hour, schoolId);
    const result: Cours[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get courses by day and hour error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getCoursByWeek: RequestHandler = async (req, res) => {
  try {
    const { weekStart, weekEnd, schoolId } = req.params;
    // Convert the week start and end to Date objects
    const startDate = new Date(weekStart);
    const endDate = new Date(weekEnd);

    // Ensure valid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      res.status(400).json({ reason: "Invalid date format." });
      return;
    }
    const query = new GetCoursByWeekQuery(startDate, endDate, schoolId);
    const result: Cours[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get courses by week error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Exporting the Controller
// ---------------------------------------------
export const CoursController = {
  createCours,
  updateCours,
  deleteCours,
  assignProfesseurToCours,
  assignMatiereToCours,
  getAllCours,
  getCoursById,
  getCoursByProfesseur,
  getCoursByClasse,
  getCoursByDay,
  getCoursByDayAndHour,
  getCoursByWeek,
};
