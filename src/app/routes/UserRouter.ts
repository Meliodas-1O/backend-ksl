import { UserController } from "../../app/controllers/UserController";
import { Router } from "express";

const userRouter = Router();

userRouter.put("/:schoolId/parents/:parentId", UserController.updateSelfParent);
userRouter.put("/:schoolId/admin-actions/parents/:parentId", UserController.updateParentFromAdmin);

userRouter.put("/:schoolId/teachers/:teacherId", UserController.updateSelfTeacher);
userRouter.put(
  "/:schoolId/admin-actions/teachers/:teacherId",
  UserController.updateTeacherFromAdmin
);

export default userRouter;
