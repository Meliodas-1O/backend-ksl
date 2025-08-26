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
exports.ResetPasswordCommandHandler = void 0;
const PasswordValidator_1 = require("./PasswordValidator");
const ValidationError_1 = require("../../../../common/application/dto/ValidationError");
const AppUser_1 = require("../../../../common/domain/entities/AppUser");
class ResetPasswordCommandHandler {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = PasswordValidator_1.passwordValidator.validateSafe(command);
            if (errors.length > 0) {
                throw new ValidationError_1.ValidationError(errors);
            }
            // Check if user exists
            const existingUser = yield this.userRepository.findUserByEmailAndSchool(command.email, command.schoolId);
            if (!existingUser) {
                throw new ValidationError_1.ValidationError(["Wrong Email or Password"]);
            }
            const isValidEmail = yield this.passwordHasher.compare(command.oldPassword, existingUser.getPassword());
            if (!isValidEmail) {
                throw new ValidationError_1.ValidationError(["Wrong Email or Password"]);
            }
            const hashedPassword = yield this.passwordHasher.hash(command.newPassword);
            const user = AppUser_1.AppUser.createBaseUser(command.email, hashedPassword, existingUser.getRoles(), command.schoolId, existingUser.getNom(), existingUser.getPrenom(), existingUser.getTelephone(), existingUser.getProfession(), existingUser.getBiographie(), existingUser.getChildren());
            yield this.userRepository.update(existingUser.id, user);
        });
    }
}
exports.ResetPasswordCommandHandler = ResetPasswordCommandHandler;
