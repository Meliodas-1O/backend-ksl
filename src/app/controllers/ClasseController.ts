import { Student } from "../../common/domain/entities/Student";
import { NotFoundError } from "../../common/application/dto/NotFoundError";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { ValidationError } from "../../common/application/dto/ValidationError";
import { Classe } from "../../common/domain/entities/Classe";
import { mediator } from "../../common/mediator/Mediator";
import { RequestHandler } from "express";
import {
  AssignMatiereToClasseCommand,
  AssignProfesseurToClasseCommand,
  CreateClasseCommand,
  DeleteClasseCommand,
  GetAllClassesQuery,
  GetClasseByIdQuery,
  GetDisciplinesInClasseQuery,
  GetParentsInClasseQuery,
  GetProfessorsInClasseQuery,
  GetStudentsInClasseQuery,
  UpdateClasseCommand,
} from "../../services/classesvc/handler/Commands";
import { AppUser } from "../../common/domain/entities/AppUser";
import { Discipline } from "../../common/domain/entities/Discipline";

// ---------------------------------------------
// Command Handlers (Mutations)
// ---------------------------------------------

const createClasse: RequestHandler = async (req, res) => {
  try {
    const { nom, niveau } = req.body;
    const command = new CreateClasseCommand(nom, niveau, req.params.schoolId);
    const result: Classe = await mediator.send(command);
    res.status(StatusCode.CREATED).json(result);
  } catch (error: any) {
    console.error("Create classe error:", error);
    if (error instanceof ValidationError) {
      res.status(StatusCode.BAD_REQUEST).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const updateClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId } = req.params;
    const { nom, niveau } = req.body;
    const command = new UpdateClasseCommand(classeId, nom, niveau, req.params.schoolId);
    const result: Classe | null = await mediator.send(command);

    if (!result) {
      throw new NotFoundError(`Classe with ID ${classeId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update classe error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const deleteClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId } = req.params;
    const command = new DeleteClasseCommand(classeId);
    await mediator.send(command);
    res.status(StatusCode.SUCCESS).json({ message: "Classe deleted successfully." });
  } catch (error: any) {
    console.error("Delete classe error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const assignProfesseurToClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId } = req.params;
    const { professeurId } = req.body;
    const command = new AssignProfesseurToClasseCommand(
      classeId,
      professeurId,
      req.params.schoolId
    );
    const result: Classe = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Assign professor to classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const assignMatiereToClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId, schoolId } = req.params;
    const { matiereId } = req.body;
    const command = new AssignMatiereToClasseCommand(classeId, matiereId, schoolId);
    const result: Classe = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Assign matiere to classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};
// ---------------------------------------------
// Query Handlers (Reads)
// ---------------------------------------------

const getAllClasses: RequestHandler = async (req, res) => {
  try {
    const query = new GetAllClassesQuery(req.params.schoolId);
    const result: Classe[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get all classes error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getClasseById: RequestHandler = async (req, res) => {
  try {
    const { classeId } = req.params;
    const query = new GetClasseByIdQuery(classeId, req.params.schoolId);
    const result: Classe | null = await mediator.send(query);

    if (!result) {
      throw new NotFoundError(`Classe with ID ${classeId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get classe by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getStudentsInClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId, schoolId } = req.params;
    const query = new GetStudentsInClasseQuery(classeId, schoolId);
    const result: Student[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get students in classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getProfessorsInClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId } = req.params;
    const query = new GetProfessorsInClasseQuery(classeId, req.params.schoolId);
    const result: AppUser[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get professors in classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getParentsInClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId } = req.params;
    const query = new GetParentsInClasseQuery(classeId, req.params.schoolId);
    const result: AppUser[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get parents in classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getDisciplinesInClasse: RequestHandler = async (req, res) => {
  try {
    const { classeId } = req.params;
    const query = new GetDisciplinesInClasseQuery(classeId, req.params.schoolId);
    const result: Discipline[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get disciplines in classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const ClasseController = {
  createClasse,
  updateClasse,
  deleteClasse,
  assignMatiereToClasse,
  assignProfesseurToClasse,
  getAllClasses,
  getClasseById,
  getStudentsInClasse,
  getProfessorsInClasse,
  getParentsInClasse,
  getDisciplinesInClasse,
};
