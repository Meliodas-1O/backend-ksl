import { Role } from "../../../core/entitites/Role";
import { User } from "../../../core/entitites/User";
import { IPasswordHasher } from "../../../core/interfaces/IPasswordHasher";
import { IUserRepository } from "../../../core/interfaces/IUserRepository";
import { userRepository } from "../../../infrastructure/database/InMemoryUserRepository";
import { passwordHasher } from "../../../infrastructure/security/PasswordHasher";
import { v4 as uuid } from "uuid";

export class RegisterUser {
  constructor(
    private userRepo: IUserRepository,
    private hasher: IPasswordHasher
  ) {}

  async execute(
    email: string,
    plainPassword: string,
    role: Role
  ): Promise<void> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("Email already used");

    const hashed = await this.hasher.hash(plainPassword);
    const user = new User(uuid(), email, hashed, role);
    await this.userRepo.save(user);
  }
}

export const registerUser: RegisterUser = new RegisterUser(
  userRepository,
  passwordHasher
);
