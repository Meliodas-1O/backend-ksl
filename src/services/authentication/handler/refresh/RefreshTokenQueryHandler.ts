import { UserNotFoundError } from "../../../../common/application/dto/UserNotFoundError";
import { IJwtService } from "../../../../common/domain/contracts/IJwtService";
import { IQueryHandler } from "../../../../common/domain/contracts/IQueryHandler";
import { IUserRepository } from "../../../../common/domain/repository/IUserRepository";
import { RefreshTokenQuery } from "./RefreshTokenQuery";

export class RefreshTokenQueryHandler implements IQueryHandler<RefreshTokenQuery, string> {
  constructor(private userRepository: IUserRepository, private jwtService: IJwtService) {}

  async execute(query: RefreshTokenQuery): Promise<string> {
    const verifiedToken = this.jwtService.verify(query.refreshToken);
    let userId: string = "1";
    if (verifiedToken) {
      userId = verifiedToken.userId;
    }
    const existingUser = await this.userRepository.findUserById(userId);
    if (!existingUser) {
      throw new UserNotFoundError("Invalid token received");
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
