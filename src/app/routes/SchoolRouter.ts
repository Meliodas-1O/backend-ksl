import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { SchoolController } from "../controllers/SchoolController";

const schoolRouter = Router();
schoolRouter.get("/:schoolId/students", StudentController.getStudentsBySchool);
schoolRouter.post("/", SchoolController.createSchool);
schoolRouter.get("/:schoolId", SchoolController.getSchoolById);
schoolRouter.get("/", SchoolController.getAllSchools);
schoolRouter.get("/:schoolId/teachers", SchoolController.findTeachersBySchool);
schoolRouter.get("/:schoolId/parents", SchoolController.findParentsBySchool);
schoolRouter.get("/:schoolId/admins", SchoolController.findAdminsBySchool);
schoolRouter.get("/:schoolId/classes", SchoolController.findClassesBySchool);

export default schoolRouter;
