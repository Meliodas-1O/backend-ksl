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

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const error: ApiError = {
      reason: "Invalid or expired token",
      statusCode: StatusCode.FORBIDDEN,
    };
    res.status(StatusCode.FORBIDDEN).json(error);
  }
};
