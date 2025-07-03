import { IJwtService } from "../../../core/interfaces/IJwtService";
import { IPasswordHasher } from "../../../core/interfaces/IPasswordHasher";
import { IUserRepository } from "../../../core/interfaces/IUserRepository";
import { userRepository } from "../../../infrastructure/database/InMemoryUserRepository";
import { jwtService } from "../../../infrastructure/security/JwtService";
import { passwordHasher } from "../../../infrastructure/security/PasswordHasher";

export class LoginUser {
  constructor(
    private userRepo: IUserRepository,
    private hasher: IPasswordHasher,
    private jwt: IJwtService
  ) {}

  async execute(email: string, plainPassword: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await this.hasher.compare(plainPassword, user.password)))
      throw new Error("Invalid credentials");

    return this.jwt.sign({
      userId: user.id,
      email: user.email,
      role: user.UserRole,
    });
  }
}

export const loginUser = new LoginUser(
  userRepository,
  passwordHasher,
  jwtService
);
