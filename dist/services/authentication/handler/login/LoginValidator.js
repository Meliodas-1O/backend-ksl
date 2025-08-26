"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const Role_1 = require("../../../../common/application/dto/Role");
exports.loginValidator = {
    isValidRole(role) {
        return Object.values(Role_1.Role).includes(role);
    },
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
        if (!this.isValidPassword(command.password)) {
            errors.push("Password must be at least 6 characters.");
        }
        if (!command.schoolId || typeof command.schoolId !== "string") {
            errors.push("Invalid school ID.");
        }
        return errors;
    },
};
