"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordRequestValidator = resetPasswordRequestValidator;
const StatusCode_1 = require("../../../../common/application/dto/StatusCode");
function resetPasswordRequestValidator(data) {
    if (!data.email || typeof data.email !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "Email is required and must be a string.",
        };
    }
    if (!data.oldPassword || typeof data.oldPassword !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "Old password is required and must be a string.",
        };
    }
    if (!data.newPassword || typeof data.newPassword !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "New password is required and must be a string.",
        };
    }
    if (!data.schoolId || typeof data.schoolId !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "School ID is required and must be a string.",
        };
    }
    return null;
}
