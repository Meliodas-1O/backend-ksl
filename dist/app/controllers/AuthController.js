"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Mediator_1 = require("../../common/mediator/Mediator");
const RegisterCommand_1 = require("../../services/authentication/handler/register/RegisterCommand");
const StatusCode_1 = require("../../common/application/dto/StatusCode");
const RegisterRequest_1 = require("../../services/authentication/models/Register/RegisterRequest");
const ValidationError_1 = require("../../common/application/dto/ValidationError");
const LoginRequest_1 = require("../../services/authentication/models/Login/LoginRequest");
const LoginCommand_1 = require("../../services/authentication/handler/login/LoginCommand");
const UserNotFoundError_1 = require("../../common/application/dto/UserNotFoundError");
const ResetPasswordRequest_1 = require("../../services/authentication/models/ResetPassword/ResetPasswordRequest");
const ResetPasswordCommand_1 = require("../../services/authentication/handler/resetPassword/ResetPasswordCommand");
const DeleteUserCommand_1 = require("../../services/authentication/handler/delete/DeleteUserCommand");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, roles, schoolId, nom, prenom, telephone, profession, students, disciplineIds, } = req.body;
        const bodyRequest = {
            email,
            password,
            roles,
            schoolId,
            nom,
            prenom,
            telephone,
            profession,
            students,
            disciplineIds,
        };
        const error = (0, RegisterRequest_1.registerRequestValidator)(bodyRequest);
        if (error) {
            res.status(error.statusCode).json(error);
            return;
        }
        const command = new RegisterCommand_1.RegisterCommand(email, password, roles, nom, prenom, schoolId, telephone, profession, students, disciplineIds);
        const result = yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.CREATED).json(result);
    }
    catch (error) {
        console.error("Registration error:", error);
        if (error instanceof ValidationError_1.ValidationError) {
            res.status(StatusCode_1.StatusCode.BAD_REQUEST).json({
                message: error.message,
            });
        }
        else if (error instanceof UserNotFoundError_1.UserNotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({
                message: error.message,
            });
        }
        else {
            res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error. " + error.message,
            });
        }
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, schoolId } = req.body;
        const bodyRequest = { email, password, schoolId };
        const error = (0, LoginRequest_1.loginRequestValidator)(bodyRequest);
        if (error) {
            res.status(error.statusCode).json(error);
            return;
        }
        const command = new LoginCommand_1.LoginCommand(email, password, schoolId);
        const result = yield Mediator_1.mediator.send(command);
        const loginResponse = {
            token: result,
            email: command.email,
            schoolId: command.schoolId,
        };
        res.status(StatusCode_1.StatusCode.SUCCESS).json(loginResponse);
    }
    catch (error) {
        console.error("Login error:", error);
        if (error instanceof ValidationError_1.ValidationError) {
            const apiError = {
                reason: error.message,
                statusCode: StatusCode_1.StatusCode.BAD_REQUEST,
            };
            res.status(StatusCode_1.StatusCode.BAD_REQUEST).json(apiError);
        }
        else {
            const apiError = {
                reason: "Internal server error. " + error.message,
                statusCode: StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR,
            };
            res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json(apiError);
        }
    }
});
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolId, newPassword, oldPassword, email } = req.body;
        const bodyRequest = {
            schoolId,
            newPassword,
            oldPassword,
            email,
        };
        const error = (0, ResetPasswordRequest_1.resetPasswordRequestValidator)(bodyRequest);
        if (error) {
            res.status(error.statusCode).json(error);
            return;
        }
        const command = new ResetPasswordCommand_1.ResetPasswordCommand(email, oldPassword, newPassword, schoolId);
        yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json({
            message: "Password reset successfully.",
        });
    }
    catch (error) {
        console.error("Reset password error:", error);
        if (error instanceof ValidationError_1.ValidationError) {
            res.status(StatusCode_1.StatusCode.BAD_REQUEST).json({
                message: error.message,
            });
        }
        else {
            res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error. " + error.message,
            });
        }
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const command = new DeleteUserCommand_1.DeleteUserCommand(userId);
        yield Mediator_1.mediator.send(command);
        res.status(StatusCode_1.StatusCode.SUCCESS).json({ message: "Course deleted successfully." });
    }
    catch (error) {
        console.error("Delete user error:", error);
        if (error instanceof UserNotFoundError_1.UserNotFoundError) {
            res.status(StatusCode_1.StatusCode.NOT_FOUND).json({ reason: error.message });
            return;
        }
        res.status(StatusCode_1.StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
    }
});
exports.AuthController = { register, login, resetPassword, deleteUser };
