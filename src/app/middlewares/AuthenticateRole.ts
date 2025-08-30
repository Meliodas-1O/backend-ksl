import { NextFunction, RequestHandler, Response } from "express";
import { ApiError } from "../../common/application/dto/ApiError";
import { AuthRequest } from "./AuthenticateToken";

// Helper middleware for role-based authorization
export const authorizeRole = (role: string): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Ensure req.user is defined and has roles, then check if it includes the desired role
    if (!req.user || !req.user.role?.includes(role)) {
      const error: ApiError = {
        reason: "Access denied. You don't have the required role.",
        statusCode: 403, // Forbidden
      };
      res.status(403).json(error);
      return;
    }
    next();
  };
};
