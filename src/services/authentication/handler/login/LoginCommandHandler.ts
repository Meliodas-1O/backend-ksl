import { ValidationError } from "../../../../common/application/dto/ValidationError";
import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IPasswordHasher } from "../../../../common/domain/contracts/IPasswordHasher";
import { IUserRepository } from "../../../../common/domain/repository/IUserRepository";
import { LoginCommand } from "./LoginCommand";
import { loginValidator } from "./LoginValidator";
import { IJwtService } from "../../../../common/domain/contracts/IJwtService";
import { VisitService } from "../../../visitsvc/Visits";

interface tokenResponse {
  accessToken: string;
  refreshToken: string;
}
export class LoginCommandHandler implements ICommandHandler<LoginCommand, tokenResponse> {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtService: IJwtService
  ) {}

  async execute(command: LoginCommand): Promise<tokenResponse> {
    // validate command here or before sending to mediator
    const errors = loginValidator.validateSafe(command);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    // Check if user exists are correct
    let existingUser = await this.userRepository.findUserByEmailAndSchoolName(
      command.email,
      command.schoolName
    );

    if (!existingUser) {
      existingUser = await this.userRepository.findUserByPhoneNumberAndSchoolName(
        command.email,
        command.schoolName
      );
    }

    if (!existingUser) {
      throw new ValidationError(["Wrong Email/Number or Password"]);
    }

    const isValidEmail: boolean = await this.passwordHasher.compare(
      command.password,
      existingUser.getPassword()
    );

    if (!isValidEmail) {
      throw new ValidationError(["Wrong Email or Password"]);
    }

    const accessToken: string = this.jwtService.sign({
      userId: existingUser.id,
      email: existingUser.getEmail(),
      role: existingUser.getRoles(),
      nom: existingUser.getNom(),
      prenom: existingUser.getPrenom(),
      schoolId: existingUser.getSchoolId(),
      profession: existingUser.getProfession(),
      biographie: existingUser.getBiographie(),
      telephone: existingUser.getTelephone(),
    });
    const refreshToken: string = this.jwtService.sign(
      { userId: existingUser.id },
      { expiresIn: "1h" }
    );
    await VisitService.createVisit(
      existingUser.id!,
      existingUser.getRoles().join(","),
      existingUser.getSchoolId()
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
