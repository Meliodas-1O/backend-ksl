import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IPasswordHasher } from "../../../../common/domain/contracts/IPasswordHasher";
import { RegisterCommand } from "./RegisterCommand";
import { IUserRepository } from "../../../../common/domain/repository/IUserRepository";
import { AppUser } from "../../../../common/domain/entities/AppUser";
import { RegisterValidator } from "./RegisterValidator";
import { ValidationError } from "../../../../common/application/dto/ValidationError";
import { Role } from "../../../../common/application/dto/Role";

export class RegisterCommandHandler implements ICommandHandler<RegisterCommand, AppUser> {
  constructor(private userRepository: IUserRepository, private passwordHasher: IPasswordHasher) {}

  async execute(command: RegisterCommand): Promise<AppUser> {
    // validate command here or before sending to mediator
    const errors = RegisterValidator.validateSafe(command);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    // Check if user doesn't already exist
    const existingUser = await this.userRepository.findUserByEmailAndSchoolName(
      command.email,
      command.schoolName
    );

    if (!existingUser) {
      // hash password through domain service interface

      const hashedPassword = await this.passwordHasher.hash(command.password);

      // create domain User entity
      const user: AppUser = AppUser.createBaseUser(
        command.email,
        hashedPassword,
        command.roles,
        command.schoolName,
        command.nom,
        command.prenom,
        command.telephone,
        command.profession,
        /* biographie */ null,
        command.students
      );

      user.disciplineIds = command.disciplineIds ?? [];

      // persist via repository interface
      return await this.userRepository.create(user);
    }

    /* If user exists
      We check the roles : 
        1. if it is the same ==> error : already exists
        2. if not ==> we add the role and update the database
    */

    const isSameUserFromSameSchool = command.roles.every((role) =>
      existingUser.getRoles().includes(role)
    );

    if (isSameUserFromSameSchool) {
      throw new ValidationError(["User already exists."]);
    }

    const combinedRoles: Role[] = Array.from(
      new Set([...existingUser.getRoles(), ...command.roles])
    );

    const user: AppUser = AppUser.createBaseUser(
      command.email,
      existingUser.getPassword(),
      combinedRoles,
      command.schoolName,
      command.nom,
      command.prenom,
      command.telephone,
      command.profession,
      /* biographie */ null,
      command.students
    );
    return await this.userRepository.update(existingUser.id!, user);
  }
}
