import { User } from "core/entitites/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
}
