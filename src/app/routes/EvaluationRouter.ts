import express from "express";
import { EvaluationController } from "../controllers/EvaluationController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const evaluationRouter = express.Router();

evaluationRouter.post(
  "/:schoolId/evaluations",
  authenticateToken,
  EvaluationController.createEvaluation
);
evaluationRouter.get(
  "/:schoolId/evaluations",
  authenticateToken,
  EvaluationController.getAllEvaluations
);
evaluationRouter.get(
  "/:schoolId/evaluations/:evaluationId",
  authenticateToken,
  EvaluationController.getEvaluationById
);
evaluationRouter.get(
  "/:schoolId/classes/:classeId/evaluations",
  authenticateToken,
  EvaluationController.getEvaluationsByClasse
);
evaluationRouter.get(
  "/:schoolId/teachers/:professeurId/evaluations",
  authenticateToken,
  EvaluationController.getEvaluationsByTeacher
);
evaluationRouter.put(
  "/:schoolId/evaluations/:evaluationId",
  authenticateToken,
  EvaluationController.updateEvaluation
);
evaluationRouter.delete(
  "/:schoolId/evaluations/:evaluationId",
  authenticateToken,
  EvaluationController.deleteEvaluation
);

export default evaluationRouter;
