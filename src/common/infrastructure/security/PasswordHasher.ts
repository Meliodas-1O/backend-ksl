import bcrypt from "bcrypt";
import { IPasswordHasher } from "../../domain/contracts/IPasswordHasher";

const saltRounds: number = 10;

export const passwordHasher: IPasswordHasher = {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, saltRounds);
  },

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  },
};
