import { StatusCode } from "../../common/application/dto/StatusCode";
import { ApiError } from "../../common/application/dto/ApiError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express-serve-static-core";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123!@#456";

export interface AuthRequest extends Request {
  user?: any; // You can type this better if needed
}

export const authenticateToken: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    const error: ApiError = {
      reason: "You are not connected.",
      statusCode: StatusCode.UNAUTHORIZED,
    };
    res.status(StatusCode.UNAUTHORIZED).json(error);
    return;
  }

  const roles = ["ADMIN", "SURVEILLANT", "TEACHER", "PARENT", "SUPER_ADMIN"];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string[] };
    if (!decoded?.role || !decoded?.role.some((r) => roles.includes(r))) {
      const error: ApiError = {
        reason: "You are not connected.",
        statusCode: StatusCode.UNAUTHORIZED,
      };
      res.status(StatusCode.UNAUTHORIZED).json(error);
      return;
    }
    req.user = decoded;
    next();
  } catch (err) {
    const error: ApiError = {
      reason: "Invalid or expired token",
      statusCode: StatusCode.UNAUTHORIZED,
    };
    res.status(StatusCode.UNAUTHORIZED).json(error);
  }
};
