"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRequestValidator = registerRequestValidator;
const StatusCode_1 = require("../../../../common/application/dto/StatusCode");
function registerRequestValidator(data) {
    if (!data.email || typeof data.email !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: " 'email' field is required and must be a string.",
        };
    }
    if (!data.password || typeof data.password !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: " 'password' field is required and must be a string.",
        };
    }
    if (!Array.isArray(data.roles) || data.roles.length === 0) {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: " 'roles' field is required and must be a non-empty array.",
        };
    }
    const invalidRole = data.roles.find((role) => typeof role !== "string");
    if (invalidRole) {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: "Each role must be a valid string.",
        };
    }
    if (!data.schoolId || typeof data.schoolId !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: " 'schoolId' field is required and must be a string.",
        };
    }
    if (!data.nom || typeof data.nom !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: " 'nom' field is required and must be a string.",
        };
    }
    if (!data.prenom || typeof data.prenom !== "string") {
        return {
            statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            reason: " 'prenom' field is required and must be a string.",
        };
    }
    return null;
}
