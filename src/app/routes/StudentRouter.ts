import { Router } from "express";
import { StudentController } from "../controllers/StudentController";

const studentRouter = Router();
studentRouter.post("/", StudentController.createStudent);
studentRouter.put("/:id", StudentController.updateStudentById);
studentRouter.delete("/:id", StudentController.deleteStudentById);
studentRouter.get("/:id", StudentController.getStudentById);
studentRouter.get("/school/:schoolId/students", StudentController.getStudentsBySchool);
export default studentRouter;
