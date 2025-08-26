"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequestValidator = loginRequestValidator;
const StatusCode_1 = require("../../../../common/application/dto/StatusCode");
function loginRequestValidator(data) {
    if (!data.email || typeof data.email !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "Email is required and must be a string.",
        };
    }
    if (!data.password || typeof data.password !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "Password is required and must be a string.",
        };
    }
    if (!data.schoolId || typeof data.schoolId !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "SchoolId is required and must be a string.",
        };
    }
    return null;
}
