import { AuthController } from "../../app/controller/authController";
import { deleteUser } from "../../application/use-cases/auth/DeleteUser";
import { loginUser } from "../../application/use-cases/auth/LoginUser";
import { registerUser } from "../../application/use-cases/auth/RegisterUser";
import { Router } from "express";

const authRouter = Router();

export const authController = new AuthController(
  registerUser,
  loginUser,
  deleteUser
);

// Example setup (you'd wire these correctly in your bootstrap)
authRouter.post("/signup", authController.register);
authRouter.post("/login", authController.login);
authRouter.delete("/user/:id", authController.delete);

export default authRouter;
