import { RequestHandler } from "express";
import { Evaluation } from "@prisma/client";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { mediator } from "../../common/mediator/Mediator";
import {
  CreateEvaluationCommand,
  GetAllEvaluationsQuery,
  GetEvaluationByIdQuery,
  GetEvaluationsByClasseQuery,
  GetEvaluationsByTeacherQuery,
  UpdateEvaluationCommand,
  DeleteEvaluationCommand,
} from "../../services/evaluationsvc/Command";

const createEvaluation: RequestHandler = async (req, res) => {
  try {
    const { title, description, date, classeId, professeurId, disciplineId } = req.body;
    const { schoolId } = req.params;

    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      res.status(StatusCode.BAD_REQUEST).json("Invalid date");
      console.log("Invalid date!", date);
      return;
    }

    const command = new CreateEvaluationCommand(
      title,
      description,
      formattedDate,
      classeId,
      professeurId,
      disciplineId,
      schoolId
    );
    const result: Evaluation = await mediator.send(command);
    res.status(StatusCode.CREATED).json(result);
  } catch (error: any) {
    console.error("Create evaluation error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getAllEvaluations: RequestHandler = async (req, res) => {
  try {
    console.log("fffffffffffff");
    const query = new GetAllEvaluationsQuery(req.params.schoolId);
    const result: Evaluation[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get all evaluations error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getEvaluationById: RequestHandler = async (req, res) => {
  try {
    const query = new GetEvaluationByIdQuery(req.params.evaluationId, req.params.schoolId);
    const result: Evaluation | null = await mediator.send(query);
    if (!result) {
      res.status(StatusCode.NOT_FOUND).json({ reason: "Evaluation not found." });
      return;
    }
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get evaluation by ID error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getEvaluationsByClasse: RequestHandler = async (req, res) => {
  try {
    const query = new GetEvaluationsByClasseQuery(req.params.classeId, req.params.schoolId);
    const result: Evaluation[] | null = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get evaluations by classe error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getEvaluationsByTeacher: RequestHandler = async (req, res) => {
  try {
    const query = new GetEvaluationsByTeacherQuery(req.params.professeurId, req.params.schoolId);
    const result: Evaluation[] | null = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get evaluations by teacher error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const updateEvaluation: RequestHandler = async (req, res) => {
  try {
    const { evaluationId, schoolId } = req.params;
    const { title, description, date } = req.body;
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      res.status(StatusCode.BAD_REQUEST).json("Invalid date");
      console.log("Invalid date!", date);
      return;
    }
    const command = new UpdateEvaluationCommand(evaluationId, schoolId, {
      date: formattedDate,
      description,
      title,
    });

    const result: Evaluation | null = await mediator.send(command);
    if (!result) {
      res.status(StatusCode.NOT_FOUND).json({ reason: "Evaluation not found." });
      return;
    }
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update evaluation error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const deleteEvaluation: RequestHandler = async (req, res) => {
  try {
    const { evaluationId, schoolId } = req.params;
    const command = new DeleteEvaluationCommand(evaluationId, schoolId);
    const result: Evaluation | null = await mediator.send(command);
    if (!result) {
      res.status(StatusCode.NOT_FOUND).json({ reason: "Evaluation not found." });
      return;
    }
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Delete evaluation error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const EvaluationController = {
  createEvaluation,
  getAllEvaluations,
  getEvaluationById,
  getEvaluationsByClasse,
  getEvaluationsByTeacher,
  updateEvaluation,
  deleteEvaluation,
};
