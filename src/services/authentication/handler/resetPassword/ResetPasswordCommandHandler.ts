import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IPasswordHasher } from "../../../../common/domain/contracts/IPasswordHasher";
import { IUserRepository } from "../../../../common/domain/repository/IUserRepository";
import { ResetPasswordCommand } from "./ResetPasswordCommand";
import { passwordValidator } from "./PasswordValidator";
import { ValidationError } from "../../../../common/application/dto/ValidationError";
import { AppUser } from "../../../../common/domain/entities/AppUser";

export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand, void> {
  constructor(private userRepository: IUserRepository, private passwordHasher: IPasswordHasher) {}
  async execute(command: ResetPasswordCommand): Promise<void> {
    const errors = passwordValidator.validateSafe(command);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    // Check if user exists
    const existingUser = await this.userRepository.findUserByEmailAndSchoolName(
      command.email,
      command.schoolId
    );

    if (!existingUser) {
      throw new ValidationError(["Wrong Email or Password"]);
    }

    const isValidEmail: boolean = await this.passwordHasher.compare(
      command.oldPassword,
      existingUser.getPassword()
    );

    if (!isValidEmail) {
      throw new ValidationError(["Wrong Email or Password"]);
    }
    const hashedPassword = await this.passwordHasher.hash(command.newPassword);

    const user: AppUser = AppUser.createBaseUser(
      command.email,
      hashedPassword,
      existingUser.getRoles(),
      command.schoolId,
      existingUser.getNom(),
      existingUser.getPrenom(),
      existingUser.getTelephone(),
      existingUser.getProfession(),
      existingUser.getBiographie(),
      existingUser.getChildren()
    );
    await this.userRepository.update(existingUser.id!, user);
  }
}
