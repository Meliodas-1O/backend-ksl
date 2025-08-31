import { NextFunction, RequestHandler, Response } from "express";
import { ApiError } from "../../common/application/dto/ApiError";
import { AuthRequest } from "./AuthenticateToken";

// Helper middleware for role-based authorization
export const authorizeRole = (possibleRoles: string[]): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Ensure req.user is defined and has roles, then check if it includes the desired role

    const userRoles = Array.isArray(req.user?.role)
      ? req.user.role
      : req.user.role
      ? [req.user.role]
      : [];

    // Check if userRoles has any role from possibleRoles
    const hasRole = possibleRoles.some((role) => userRoles.includes(role));
    if (!req.user || !hasRole) {
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
