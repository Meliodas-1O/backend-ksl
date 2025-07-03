import bcrypt from "bcrypt";
import { IPasswordHasher } from "core/interfaces/IPasswordHasher";

class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}

export const passwordHasher = new BcryptPasswordHasher();
