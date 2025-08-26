"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(error) {
        super(`Entity not found : ${error}`);
        this.error = error;
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
