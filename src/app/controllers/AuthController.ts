import { RequestHandler } from "express";
import { mediator } from "../../common/mediator/Mediator";
import { RegisterCommand } from "../../services/authentication/handler/register/RegisterCommand";
import { StatusCode } from "../../common/application/dto/StatusCode";
import {
  RegisterRequest,
  registerRequestValidator,
} from "../../services/authentication/models/Register/RegisterRequest";
import { ValidationError } from "../../common/application/dto/ValidationError";
import {
  LoginRequest,
  loginRequestValidator,
} from "../../services/authentication/models/Login/LoginRequest";
import { LoginCommand } from "../../services/authentication/handler/login/LoginCommand";
import { UserNotFoundError } from "../../common/application/dto/UserNotFoundError";
import { LoginResponse } from "../../services/authentication/models/Login/LoginResponse";
import { AppUser } from "generated/prisma/";
import {
  ResetPasswordRequest,
  resetPasswordRequestValidator,
} from "../../services/authentication/models/ResetPassword/ResetPasswordRequest";
import { ResetPasswordCommand } from "../../services/authentication/handler/resetPassword/ResetPasswordCommand";
import { ApiError } from "common/application/dto/ApiError";

const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, roles, schoolId, nom, prenom, telephone, profession, students } =
      req.body;
    const bodyRequest: RegisterRequest = {
      email,
      password,
      roles,
      schoolId,
      nom,
      prenom,
      telephone,
      profession,
      students,
    };
    const error = registerRequestValidator(bodyRequest);
    if (error) {
      res.status(error.statusCode).json(error);
      return;
    }
    const command = new RegisterCommand(
      email,
      password,
      roles,
      nom,
      prenom,
      schoolId,
      telephone,
      profession,
      students
    );

    const result: AppUser = await mediator.send<RegisterCommand, AppUser>(command);
    res.status(StatusCode.CREATED).json(result);
  } catch (error: any) {
    console.error("Registration error:", error);
    if (error instanceof ValidationError) {
      res.status(StatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    } else if (error instanceof UserNotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({
        message: error.message,
      });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error. " + error.message,
      });
    }
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password, schoolId } = req.body;
    const bodyRequest: LoginRequest = { email, password, schoolId };

    const error = loginRequestValidator(bodyRequest);
    if (error) {
      res.status(error.statusCode).json(error);
      return;
    }

    const command = new LoginCommand(email, password, schoolId);
    const result: string = await mediator.send<LoginCommand, string>(command);
    const loginResponse: LoginResponse = {
      token: result,
      email: command.email,
      schoolId: command.schoolId,
    };
    res.status(StatusCode.SUCCESS).json(loginResponse);
  } catch (error: any) {
    console.error("Login error:", error);
    if (error instanceof ValidationError) {
      const apiError: ApiError = {
        reason: error.message,
        statusCode: StatusCode.BAD_REQUEST,
      };
      res.status(StatusCode.BAD_REQUEST).json(apiError);
    } else {
      const apiError: ApiError = {
        reason: "Internal server error. " + error.message,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(apiError);
    }
  }
};

const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { schoolId, newPassword, oldPassword, email } = req.body;
    const bodyRequest: ResetPasswordRequest = {
      schoolId,
      newPassword,
      oldPassword,
      email,
    };

    const error = resetPasswordRequestValidator(bodyRequest);
    if (error) {
      res.status(error.statusCode).json(error);
      return;
    }

    const command = new ResetPasswordCommand(email, oldPassword, newPassword, schoolId);
    await mediator.send<ResetPasswordCommand, void>(command);

    res.status(StatusCode.SUCCESS).json({
      message: "Password reset successfully.",
    });
  } catch (error: any) {
    console.error("Reset password error:", error);
    if (error instanceof ValidationError) {
      res.status(StatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error. " + error.message,
      });
    }
  }
};

export const AuthController = { register, login, resetPassword };
