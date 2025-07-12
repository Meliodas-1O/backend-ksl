// app/routes/professorRoutes.ts
import { TeacherController } from "../controller/teacherController";
import { Router } from "express";

const teacherRouter = Router();

teacherRouter.post("/", TeacherController.create);
teacherRouter.put("/:id", TeacherController.update);
teacherRouter.get("/:id", TeacherController.get);
teacherRouter.delete("/:id", TeacherController.delete);
teacherRouter.post("/:id/classes", TeacherController.addClass);

export default teacherRouter;
