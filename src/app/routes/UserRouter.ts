import { UserController } from "../../app/controllers/UserController";
import { Router } from "express";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const userRouter = Router();

userRouter.put("/:schoolId/parents/:parentId", authenticateToken, UserController.updateSelfParent);
userRouter.put(
  "/:schoolId/admin-actions/parents/:parentId",
  authenticateToken,
  UserController.updateParentFromAdmin
);

userRouter.put(
  "/:schoolId/teachers/:teacherId",
  authenticateToken,
  UserController.updateSelfTeacher
);
userRouter.put(
  "/:schoolId/admin-actions/teachers/:teacherId",
  authenticateToken,
  UserController.updateTeacherFromAdmin
);

export default userRouter;
