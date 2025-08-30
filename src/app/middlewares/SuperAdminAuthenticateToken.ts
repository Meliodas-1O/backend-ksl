import { RequestHandler } from "express";
import { ApiError } from "../../common/application/dto/ApiError";
import { StatusCode } from "../../common/application/dto/StatusCode";
import jwt from "jsonwebtoken";
import { AuthRequest } from "./AuthenticateToken";

const JWT_SECRET = process.env.JWT_SECRET || "MeliodasAndEscanor123!@#456++";

export const superAdminAuthenticateToken: RequestHandler = (
  req: AuthRequest,
  res,
  next
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
    const decoded = jwt.verify(token, JWT_SECRET) as { roles: string[] };
    if (!decoded.roles || !decoded.roles.includes("SUPER_ADMIN")) {
      const error: ApiError = {
        reason: "Access denied. Admins only.",
        statusCode: StatusCode.FORBIDDEN,
      };
      res.status(StatusCode.FORBIDDEN).json(error);
      return;
    }
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
