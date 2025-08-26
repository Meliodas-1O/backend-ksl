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
exports.RegisterCommandHandler = void 0;
const AppUser_1 = require("../../../../common/domain/entities/AppUser");
const RegisterValidator_1 = require("./RegisterValidator");
const ValidationError_1 = require("../../../../common/application/dto/ValidationError");
class RegisterCommandHandler {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // validate command here or before sending to mediator
            const errors = RegisterValidator_1.RegisterValidator.validateSafe(command);
            if (errors.length > 0) {
                throw new ValidationError_1.ValidationError(errors);
            }
            // Check if user doesn't already exist
            const existingUser = yield this.userRepository.findUserByEmailAndSchool(command.email, command.schoolId);
            if (!existingUser) {
                // hash password through domain service interface
                const hashedPassword = yield this.passwordHasher.hash(command.password);
                // create domain User entity
                const user = AppUser_1.AppUser.createBaseUser(command.email, hashedPassword, command.roles, command.schoolId, command.nom, command.prenom, command.telephone, command.profession, 
                /* biographie */ null, command.students);
                user.disciplineIds = (_a = command.disciplineIds) !== null && _a !== void 0 ? _a : [];
                // persist via repository interface
                return yield this.userRepository.create(user);
            }
            /* If user exists
              We check the roles :
                1. if it is the same ==> error : already exists
                2. if not ==> we add the role and update the database
            */
            const isSameUserFromSameSchool = command.roles.every((role) => existingUser.getRoles().includes(role));
            if (isSameUserFromSameSchool) {
                throw new ValidationError_1.ValidationError(["User already exists."]);
            }
            const combinedRoles = Array.from(new Set([...existingUser.getRoles(), ...command.roles]));
            const user = AppUser_1.AppUser.createBaseUser(command.email, existingUser.getPassword(), combinedRoles, command.schoolId, command.nom, command.prenom, command.telephone, command.profession, 
            /* biographie */ null, command.students);
            return yield this.userRepository.update(existingUser.id, user);
        });
    }
}
exports.RegisterCommandHandler = RegisterCommandHandler;
