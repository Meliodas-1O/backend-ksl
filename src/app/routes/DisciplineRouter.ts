import { DisciplineController } from "../../app/controllers/DisciplineController";
import { Router } from "express";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const disciplineRouter = Router();

disciplineRouter.get(
  "/:schoolId/disciplines",
  authenticateToken,
  DisciplineController.getAllDisciplines
);
disciplineRouter.get(
  "/:schoolId/disciplines/:disciplineId",
  authenticateToken,
  DisciplineController.getDisciplineById
);

export default disciplineRouter;
