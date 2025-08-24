import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticateToken } from "../../app/middlewares/AuthenticateToken";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.put("/reset-password", authenticateToken, AuthController.resetPassword);
authRouter.delete("/users/:userId", AuthController.deleteUser);

export default authRouter;
