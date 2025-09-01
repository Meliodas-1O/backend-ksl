import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticateToken } from "../../app/middlewares/AuthenticateToken";
import { authorizeRole } from "../middlewares/AuthenticateRole";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.put("/reset-password", authenticateToken, AuthController.resetPassword);
authRouter.delete(
  "/users/:userId",
  authenticateToken,
  authorizeRole(["ADMIN", "SURVEILLANT", "SUPER_ADMIN"]),
  AuthController.deleteUser
);
authRouter.post("/refresh", AuthController.refreshToken);
authRouter.get("/me/role/:role", authenticateToken, AuthController.getPersonalInfo);

export default authRouter;
