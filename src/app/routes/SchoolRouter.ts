import { Router } from "express";
import { StudentController } from "../controllers/StudentController";

const schoolRouter = Router();
schoolRouter.get("/:schoolId/students", StudentController.getStudentsBySchool);

export default schoolRouter;
