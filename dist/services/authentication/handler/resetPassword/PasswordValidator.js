"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = void 0;
exports.passwordValidator = {
    isValidPassword(password) {
        return typeof password === "string" && password.length >= 6;
    },
    isValidEmail(email) {
        if (typeof email !== "string")
            return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    validateSafe(command) {
        const errors = [];
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
