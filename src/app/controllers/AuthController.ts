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
import { AppUser } from "../../common/domain/entities/AppUser";
import {
  ResetPasswordRequest,
  resetPasswordRequestValidator,
} from "../../services/authentication/models/ResetPassword/ResetPasswordRequest";
import { ResetPasswordCommand } from "../../services/authentication/handler/resetPassword/ResetPasswordCommand";
import { ApiError } from "../../common/application/dto/ApiError";
import { DeleteUserCommand } from "../../services/authentication/handler/delete/DeleteUserCommand";
import { RefreshTokenQuery } from "../../services/authentication/handler/refresh/RefreshTokenQuery";
import {
  GetParentByIdQuery,
  GetTeacherByIdQuery,
} from "../../services/schoolsvc/handler/SchoolQueries";
import { NotFoundError } from "../../common/application/dto/NotFoundError";

const register: RequestHandler = async (req, res) => {
  try {
    const {
      email,
      password,
      roles,
      schoolId,
      nom,
      prenom,
      telephone,
      profession,
      students,
      disciplineIds,
    } = req.body;

    const trimmedEmail: string = email?.trim()?.toLowerCase();
    const trimmedPassword = password?.trim();
    const trimmedPhone = telephone?.trim();
    const bodyRequest: RegisterRequest = {
      email: trimmedEmail,
      password: trimmedPassword,
      roles,
      schoolId,
      nom,
      prenom,
      telephone: trimmedPhone,
      profession,
      students,
      disciplineIds,
    };
    const error = registerRequestValidator(bodyRequest);
    if (error) {
      res.status(error.statusCode).json(error);
      return;
    }

    const command = new RegisterCommand(
      trimmedEmail,
      trimmedPassword,
      roles,
      nom,
      prenom,
      schoolId,
      trimmedPhone,
      profession,
      students,
      disciplineIds
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
    const { email, password, schoolName } = req.body;
    const trimmedEmail: string = email?.trim()?.toLowerCase();
    const trimmedPassword = password?.trim();
    const bodyRequest: LoginRequest = {
      email: trimmedEmail,
      password: trimmedPassword,
      schoolName: schoolName,
    };

    const error = loginRequestValidator(bodyRequest);
    if (error) {
      res.status(error.statusCode).json(error);
      return;
    }

    const command = new LoginCommand(trimmedEmail, trimmedPassword, schoolName);
    const result: {
      accessToken: string;
      refreshToken: string;
    } = await mediator.send<
      LoginCommand,
      {
        accessToken: string;
        refreshToken: string;
      }
    >(command);
    const loginResponse: LoginResponse = {
      token: result.accessToken,
      email: command.email,
      schoolId: command.schoolName,
    };
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
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
    const trimmedEmail = email?.trim();
    const trimmedPassword = newPassword?.trim();

    const bodyRequest: ResetPasswordRequest = {
      schoolId,
      newPassword: trimmedPassword,
      oldPassword,
      email: trimmedEmail,
    };

    const error = resetPasswordRequestValidator(bodyRequest);
    if (error) {
      res.status(error.statusCode).json(error);
      return;
    }

    const command = new ResetPasswordCommand(trimmedEmail, oldPassword, trimmedPassword, schoolId);
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

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const command = new DeleteUserCommand(userId);
    await mediator.send(command);
    res.status(StatusCode.SUCCESS).json({ message: "User deleted successfully." });
  } catch (error: any) {
    console.error("Delete user error:", error);
    if (error instanceof UserNotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const refreshToken: RequestHandler = async (req: any, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(StatusCode.UNAUTHORIZED).json({ message: "Refresh token not found" });
    return;
  }
  try {
    // Send mediator query
    const command = new RefreshTokenQuery(token);
    const accessToken = await mediator.send(command);
    res.json({ accessToken });
    return;
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

const getPersonalInfo: RequestHandler = async (req: any, res) => {
  const roleParam = req.params.role;
  const schoolId = req.params.schoolId;
  // Normalize roles to an array
  const userRoles: string[] = Array.isArray(req.user?.role)
    ? req.user.role
    : req.user?.role
    ? [req.user.role]
    : [];

  // Check for role access
  if (!userRoles.includes(roleParam)) {
    res.status(403).json({ message: "Rôle invalide" });
    return;
  }

  // Handle specific roles
  switch (roleParam) {
    case "TEACHER":
      const teacherQuery = new GetTeacherByIdQuery(req.user.userId, schoolId);
      const teacherResult = await mediator.send(teacherQuery);

      if (!teacherResult) {
        res.status(404).json(`Teacher with ID ${req.user.userId} not found.`);
      }

      res.status(StatusCode.SUCCESS).json(teacherResult);
      return;

    case "PARENT":
      const query = new GetParentByIdQuery(req.user.userId, schoolId);
      const result = await mediator.send(query);

      if (!result) {
        throw new NotFoundError(`Parent with ID ${req.user.userId} not found.`);
      }

      res.status(StatusCode.SUCCESS).json(result);
      return;

    default:
      res.status(400).json({ message: "Rôle non reconnu" });
      return;
  }
};

export const AuthController = {
  register,
  login,
  resetPassword,
  deleteUser,
  refreshToken,
  getPersonalInfo,
};
