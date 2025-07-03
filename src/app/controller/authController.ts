// src/app/controllers/AuthController.ts

import {
  DeleteUser,
  deleteUser,
} from "../../application/use-cases/auth/DeleteUser";
import {
  LoginUser,
  loginUser,
} from "../../application/use-cases/auth/LoginUser";
import {
  RegisterUser,
  registerUser,
} from "../../application/use-cases/auth/RegisterUser";
import {
  createRegisterRequest,
  validateBodyRequest,
} from "../../application/dto/auth/register/RegisterRequest";

import { Request, Response } from "express";

export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser,
    private deleteUser: DeleteUser
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      const isErrorInBodyRequest = validateBodyRequest(body);

      if (isErrorInBodyRequest) {
        res.status(400).send({ error: isErrorInBodyRequest });
        return;
      }

      const registerRequest = createRegisterRequest(body);
      await this.registerUser.execute(
        registerRequest.email,
        registerRequest.password,
        registerRequest.role
      );
      res.status(201).send("User created");
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const token = await this.loginUser.execute(
        req.body.email,
        req.body.password
      );
      res.send({ token });
    } catch (err: any) {
      res.status(401).send({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.deleteUser.execute(req.params.id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  };
}
