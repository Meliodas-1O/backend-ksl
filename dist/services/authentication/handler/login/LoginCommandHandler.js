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
exports.LoginCommandHandler = void 0;
const ValidationError_1 = require("../../../../common/application/dto/ValidationError");
const LoginValidator_1 = require("./LoginValidator");
class LoginCommandHandler {
    constructor(userRepository, passwordHasher, jwtService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtService = jwtService;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate command here or before sending to mediator
            const errors = LoginValidator_1.loginValidator.validateSafe(command);
            if (errors.length > 0) {
                throw new ValidationError_1.ValidationError(errors);
            }
            // Check if user exists are correct
            const existingUser = yield this.userRepository.findUserByEmailAndSchool(command.email, command.schoolId);
            if (!existingUser) {
                throw new ValidationError_1.ValidationError(["Wrong Email or Password"]);
            }
            const isValidEmail = yield this.passwordHasher.compare(command.password, existingUser.getPassword());
            if (!isValidEmail) {
                throw new ValidationError_1.ValidationError(["Wrong Email or Password"]);
            }
            return this.jwtService.sign({
                userId: existingUser.id,
                email: existingUser.getEmail(),
                role: existingUser.getRoles(),
                nom: existingUser.getNom(),
                prenom: existingUser.getPrenom(),
                schoolId: existingUser.getSchoolId(),
            });
        });
    }
}
exports.LoginCommandHandler = LoginCommandHandler;
