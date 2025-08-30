import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { SchoolController } from "../controllers/SchoolController";
import { authenticateToken } from "../middlewares/AuthenticateToken";
import { superAdminAuthenticateToken } from "../middlewares/SuperAdminAuthenticateToken";
import { authorizeRole } from "../middlewares/AuthenticateRole";

const schoolRouter = Router();
schoolRouter.get(
  "/:schoolId",
  authenticateToken,
  SchoolController.getSchoolById
);
schoolRouter.get(
  "/",
  superAdminAuthenticateToken,
  SchoolController.getAllSchools
);

schoolRouter.get(
  "/:schoolId/students",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  StudentController.getStudentsBySchool
);
schoolRouter.get(
  "/:schoolId/teachers",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  SchoolController.findTeachersBySchool
);
schoolRouter.get(
  "/:schoolId/parents",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  SchoolController.findParentsBySchool
);
schoolRouter.get(
  "/:schoolId/admins",
  authenticateToken,
  authorizeRole("SUPER_ADMIN"),
  SchoolController.findAdminsBySchool
);
schoolRouter.get(
  "/:schoolId/classes",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  SchoolController.findClassesBySchool
);

schoolRouter.get(
  "/:schoolId/students/:studentId",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  SchoolController.getStudentById
);
schoolRouter.get(
  "/:schoolId/teachers/:teacherId",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  SchoolController.getTeacherById
);
schoolRouter.get(
  "/:schoolId/parents/:parentId",
  authenticateToken,
  authorizeRole("ADMIN"),
  authorizeRole("SURVEILLANT"),
  SchoolController.getParentById
);
schoolRouter.get(
  "/:schoolId/classes/:classId",
  authenticateToken,
  SchoolController.getClasseById
);

export default schoolRouter;
