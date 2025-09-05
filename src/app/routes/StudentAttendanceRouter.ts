import { Router } from "express";
import { StudentAttendanceController } from "../controllers/StudentAttendanceController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const studentAttendanceRouter = Router();

// Routes for creating and updating attendance records
studentAttendanceRouter.post(
  "/:schoolId/school-attendances/",
  authenticateToken,
  StudentAttendanceController.createStudentAttendance
);
studentAttendanceRouter.patch(
  "/:schoolId/school-attendances/:id",
  authenticateToken,
  StudentAttendanceController.updateStudentAttendance
);
studentAttendanceRouter.delete(
  "/:schoolId/school-attendances/:id",
  authenticateToken,
  StudentAttendanceController.deleteStudentAttendance
);

// Routes for querying attendance records
studentAttendanceRouter.get(
  "/:schoolId/school-attendances/:id",
  authenticateToken,
  StudentAttendanceController.getStudentAttendanceById
);
studentAttendanceRouter.get(
  "/:schoolId/school-attendances/students/:studentId",
  authenticateToken,
  StudentAttendanceController.getStudentAttendanceByStudentId
);
studentAttendanceRouter.get(
  "/:schoolId/school-attendances/disciplines/:disciplineId",
  authenticateToken,
  StudentAttendanceController.getStudentAttendanceByDisciplineId
);
studentAttendanceRouter.get(
  "/:schoolId/school-attendances/types/:type",
  authenticateToken,
  StudentAttendanceController.getStudentAttendanceByType
);

export default studentAttendanceRouter;
