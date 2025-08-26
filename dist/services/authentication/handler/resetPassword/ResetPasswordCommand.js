"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordCommand = void 0;
class ResetPasswordCommand {
    constructor(email, oldPassword, newPassword, schoolId) {
        this.email = email;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.schoolId = schoolId;
    }
}
exports.ResetPasswordCommand = ResetPasswordCommand;
