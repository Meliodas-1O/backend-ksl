import { IUserRepository } from "../../../core/interfaces/IUserRepository";
import { userRepository } from "../../../infrastructure/database/InMemoryUserRepository";

export class DeleteUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    await this.userRepo.delete(userId);
  }
}
export const deleteUser = new DeleteUser(userRepository);
