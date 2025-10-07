import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { SchoolController } from "../controllers/SchoolController";
import { authenticateToken } from "../middlewares/AuthenticateToken";
import { superAdminAuthenticateToken } from "../middlewares/SuperAdminAuthenticateToken";
import { authorizeRole } from "../middlewares/AuthenticateRole";
const schoolRouter = Router();

schoolRouter.put(
  "/:schoolId",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.updateSchool
);
schoolRouter.get("/:schoolId", authenticateToken, SchoolController.getSchoolById);

schoolRouter.get("/", superAdminAuthenticateToken, SchoolController.getAllSchools);

schoolRouter.get(
  "/:schoolId/students",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  StudentController.getStudentsBySchool
);

schoolRouter.get(
  "/:schoolId/teachers",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.findTeachersBySchool
);

schoolRouter.get(
  "/:schoolId/parents",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.findParentsBySchool
);

schoolRouter.get(
  "/:schoolId/admins",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.findAdminsBySchool
);

schoolRouter.get(
  "/:schoolId/classes",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.findClassesBySchool
);

schoolRouter.get(
  "/:schoolId/students/:studentId",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.getStudentById
);

schoolRouter.get(
  "/:schoolId/teachers/:teacherId",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.getTeacherById
);

schoolRouter.get(
  "/:schoolId/parents/:parentId",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  SchoolController.getParentById
);

schoolRouter.get("/:schoolId/classes/:classId", authenticateToken, SchoolController.getClasseById);
schoolRouter.put(
  "/:schoolId/counters/schoolReport",
  authenticateToken,
  SchoolController.UpdateSchoolReportGeneratedCounter
);
schoolRouter.put(
  "/:schoolId/counters/studentReport",
  authenticateToken,
  SchoolController.UpdateStudentReportGeneratedCounter
);

export default schoolRouter;
