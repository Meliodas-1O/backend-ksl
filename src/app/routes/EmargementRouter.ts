import { Router } from "express";
import { EmargementController } from "../controllers/EmargementController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const emargementRouter = Router();

emargementRouter.post(
  "/:schoolId/emargements",
  authenticateToken,
  EmargementController.createEmargement
);

emargementRouter.get(
  "/:schoolId/emargements/:emargementId",
  authenticateToken,
  EmargementController.getEmargementById
);

emargementRouter.get(
  "/:schoolId/emargements",
  authenticateToken,
  EmargementController.getAllEmargements
);

emargementRouter.get(
  "/:schoolId/emargements/user/:professeurId",
  authenticateToken,
  EmargementController.getEmargementByUserId
);

export default emargementRouter;
