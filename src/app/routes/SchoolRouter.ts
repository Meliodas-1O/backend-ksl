import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { SchoolController } from "../controllers/SchoolController";

const schoolRouter = Router();
schoolRouter.post("/", SchoolController.createSchool);
schoolRouter.get("/:schoolId", SchoolController.getSchoolById);
schoolRouter.get("/", SchoolController.getAllSchools);

schoolRouter.get("/:schoolId/students", StudentController.getStudentsBySchool);
schoolRouter.get("/:schoolId/teachers", SchoolController.findTeachersBySchool);
schoolRouter.get("/:schoolId/parents", SchoolController.findParentsBySchool);
schoolRouter.get("/:schoolId/admins", SchoolController.findAdminsBySchool);
schoolRouter.get("/:schoolId/classes", SchoolController.findClassesBySchool);

schoolRouter.get("/:schoolId/students/:studentId", SchoolController.getStudentById);
schoolRouter.get("/:schoolId/teachers/:teacherId", SchoolController.getTeacherById);
schoolRouter.get("/:schoolId/parents/:parentId", SchoolController.getParentById);
schoolRouter.get("/:schoolId/classes/:classId", SchoolController.getClasseById);

export default schoolRouter;
