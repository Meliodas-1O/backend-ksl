import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { superAdminAuthenticateToken } from "../middlewares/SuperAdminAuthenticateToken";

const adminRouter = Router();

adminRouter.post(
  "/roles",
  superAdminAuthenticateToken,
  AdminController.createRole
);
adminRouter.get(
  "/roles",
  superAdminAuthenticateToken,
  AdminController.getAllRoles
);

adminRouter.post(
  "/schools",
  superAdminAuthenticateToken,
  AdminController.createSchool
);
adminRouter.delete(
  "/schools/:schoolId",
  superAdminAuthenticateToken,
  AdminController.deleteSchool
);
adminRouter.post(
  "/admins",
  superAdminAuthenticateToken,
  AdminController.createAdmin
);
adminRouter.delete(
  "/admins/:adminId/schools/:schoolId",
  superAdminAuthenticateToken,
  AdminController.deleteAdmin
);
adminRouter.post(
  "/assign-role",
  superAdminAuthenticateToken,
  AdminController.assignRoleToUser
);
adminRouter.post(
  "/remove-role",
  superAdminAuthenticateToken,
  AdminController.removeRoleFromUser
);

adminRouter.post(
  "/disciplines",
  superAdminAuthenticateToken,
  AdminController.createDiscipline
);

adminRouter.get(
  "/disciplines",
  superAdminAuthenticateToken,
  AdminController.getDisciplines
);
adminRouter.delete(
  "/disciplines/:disciplineId",
  superAdminAuthenticateToken,
  AdminController.deleteDiscipline
);

export default adminRouter;
