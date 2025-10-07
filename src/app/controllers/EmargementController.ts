import { RequestHandler } from "express";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { mediator } from "../../common/mediator/Mediator";
import {
  CreateEmargementCommand,
  GetAllEmargementsQuery,
  GetEmargementByIdQuery,
  GetEmargementByUserIdQuery,
} from "../../services/emargementsvc/CommandsAndQueries";

export const EmargementController = {
  // ✅ Create new emargement
  createEmargement: (async (req, res) => {
    try {
      const {
        classeId,
        disciplineId,
        professeurId,
        debut,
        fin,
        seanceCounter,
        content,
        additionalInfo,
      } = req.body;
      const { schoolId } = req.params;

      const command = new CreateEmargementCommand(
        professeurId,
        classeId,
        disciplineId,
        new Date(debut),
        new Date(fin),
        seanceCounter,
        content,
        schoolId,
        additionalInfo
      );

      const result = await mediator.send(command);
      res.status(StatusCode.CREATED).json(result);
    } catch (error: any) {
      console.error("Create emargement error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
  }) as RequestHandler,

  // ✅ Get emargement by ID
  getEmargementById: (async (req, res) => {
    try {
      const { schoolId, emargementId } = req.params;

      const query = new GetEmargementByIdQuery(emargementId, schoolId);
      const result = await mediator.send(query);

      res.status(StatusCode.SUCCESS).json(result);
    } catch (error: any) {
      console.error("Get emargement by ID error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
  }) as RequestHandler,

  // ✅ Get all emargements for a school
  getAllEmargements: (async (req, res) => {
    try {
      const { schoolId } = req.params;
      const query = new GetAllEmargementsQuery(schoolId);
      const result = await mediator.send(query);
      res.status(StatusCode.SUCCESS).json(result);
    } catch (error: any) {
      console.error("Get all emargements error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
  }) as RequestHandler,

  // ✅ Get emargements by teacher (professeurId)
  getEmargementByUserId: (async (req, res) => {
    try {
      const { professeurId, schoolId } = req.params;
      const query = new GetEmargementByUserIdQuery(professeurId, schoolId);
      const result = await mediator.send(query);
      res.status(StatusCode.SUCCESS).json(result);
    } catch (error: any) {
      console.error("Get emargement by user error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
  }) as RequestHandler,
};
