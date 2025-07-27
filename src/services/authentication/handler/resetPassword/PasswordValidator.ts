import { ResetPasswordCommand } from "./ResetPasswordCommand";

export const passwordValidator = {
  isValidPassword(password: unknown): boolean {
    return typeof password === "string" && password.length >= 6;
  },

  isValidEmail(email: unknown): boolean {
    if (typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  validateSafe(command: ResetPasswordCommand): string[] {
    const errors: string[] = [];

    if (!this.isValidEmail(command.email)) {
      errors.push("Invalid email format.");
    }

    if (!this.isValidPassword(command.newPassword)) {
      errors.push("New password must be at least 6 characters.");
    }

    if (!command.schoolId || typeof command.schoolId !== "string") {
      errors.push("Invalid school ID.");
    }

    return errors;
  },
};
