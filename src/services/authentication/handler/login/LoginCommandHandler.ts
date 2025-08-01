import { ValidationError } from "../../../../common/application/dto/ValidationError";
import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IPasswordHasher } from "../../../../common/domain/contracts/IPasswordHasher";
import { AppUser } from "../../../../common/domain/entities/AppUser";
import { IUserRepository } from "../../../../common/domain/repository/IUserRepository";
import { LoginCommand } from "./LoginCommand";
import { Role } from "../../../../common/application/dto/Role";
import { loginValidator } from "./LoginValidator";
import { UserNotFoundError } from "../../../../common/application/dto/UserNotFoundError";
import { IJwtService } from "../../../../common/domain/contracts/IJwtService";

export class LoginCommandHandler implements ICommandHandler<LoginCommand, string> {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtService: IJwtService
  ) {}

  async execute(command: LoginCommand): Promise<string> {
    // validate command here or before sending to mediator
    const errors = loginValidator.validateSafe(command);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    // Check if user exists are correct
    const existingUser = await this.userRepository.findUserByEmailAndSchool(
      command.email,
      command.schoolId
    );

    if (!existingUser) {
      throw new ValidationError(["Wrong Email or Password"]);
    }

    const isValidEmail: boolean = await this.passwordHasher.compare(
      command.password,
      existingUser.getPassword()
    );

    if (!isValidEmail) {
      throw new ValidationError(["Wrong Email or Password"]);
    }

    return this.jwtService.sign({
      userId: existingUser.id,
      email: existingUser.getEmail(),
      role: existingUser.getRoles(),
      nom: existingUser.getNom(),
      prenom: existingUser.getPrenom(),
      schoolId: existingUser.getSchoolId(),
    });
  }
}
