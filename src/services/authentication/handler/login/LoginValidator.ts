import { Role } from "../../../../common/application/dto/Role";
import { LoginCommand } from "./LoginCommand";

export const loginValidator = {
  isValidRole(role: unknown): boolean {
    return Object.values(Role).includes(role as Role);
  },

  isValidPassword(password: unknown): boolean {
    return typeof password === "string" && password.length >= 6;
  },

  isValidEmail(email: unknown): boolean {
    if (typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  validateSafe(command: LoginCommand): string[] {
    const errors: string[] = [];

    if (!this.isValidEmail(command.email)) {
      errors.push("Invalid email format.");
    }

    if (!this.isValidPassword(command.password)) {
      errors.push("Password must be at least 6 characters.");
    }

    if (!command.schoolId || typeof command.schoolId !== "string") {
      errors.push("Invalid school ID.");
    }

    return errors;
  },
};
