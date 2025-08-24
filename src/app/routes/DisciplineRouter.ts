import { DisciplineController } from "../../app/controllers/DisciplineController";
import { Router } from "express";

const disciplineRouter = Router();

disciplineRouter.get("/:schoolId/disciplines", DisciplineController.getAllDisciplines);
disciplineRouter.get(
  "/:schoolId/disciplines/:disciplineId",
  DisciplineController.getDisciplineById
);

export default disciplineRouter;
