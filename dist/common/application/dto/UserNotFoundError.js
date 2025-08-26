"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor(errors) {
        super(`User not found: ${errors}`);
        this.errors = errors;
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
