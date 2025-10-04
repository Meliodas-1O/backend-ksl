import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123!@#456";

export const authenticateSocket = (socket: Socket, next: (err?: any) => void) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      const error = new Error("You are not connected.");
      error.name = "UnauthorizedError";
      return next(error);
    }

    const roles = ["ADMIN", "SURVEILLANT", "TEACHER", "PARENT", "SUPER_ADMIN"];

    const decoded = jwt.verify(token, JWT_SECRET) as { role: string[] };

    if (!decoded?.role || !decoded.role.some((r) => roles.includes(r))) {
      const error = new Error("You are not connected.");
      error.name = "UnauthorizedError";
      return next(error);
    }

    socket.data.user = decoded;

    next();
  } catch (err) {
    const error = new Error("Invalid or expired token");
    error.name = "UnauthorizedError";
    return next(error);
  }
};
