import { GetAllDisciplinesQuery, GetDisciplineByIdQuery } from "../../services/courssvc/Commands";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { mediator } from "../../common/mediator/Mediator";
import { RequestHandler } from "express";

const getAllDisciplines: RequestHandler = async (req, res) => {
  try {
    const query = new GetAllDisciplinesQuery(req.params.schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get all disciplines error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getDisciplineById: RequestHandler = async (req, res) => {
  try {
    const query = new GetDisciplineByIdQuery(req.params.schoolId, req.params.disciplineId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get all disciplines error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const DisciplineController = {
  getAllDisciplines,
  getDisciplineById,
};
