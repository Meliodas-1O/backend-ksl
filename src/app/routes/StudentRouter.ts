import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const studentRouter = Router();
studentRouter.post(
  "/:schoolId/students",
  authenticateToken,
  StudentController.createStudent
);
studentRouter.put(
  "/:schoolId/students/:id",
  authenticateToken,
  StudentController.updateStudentById
);
studentRouter.delete(
  "/:schoolId/students/:id",
  authenticateToken,
  StudentController.deleteStudentById
);
studentRouter.get(
  "/:schoolId/students/:id",
  authenticateToken,
  StudentController.getStudentById
);
export default studentRouter;
