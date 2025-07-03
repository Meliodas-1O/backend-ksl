import { User } from "../../core/entitites/User";
import { IUserRepository } from "../../core/interfaces/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user ?? null;
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user; // Update existing
    } else {
      this.users.push(user); // Add new
    }
  }

  async delete(userId: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== userId);
  }
}

export const userRepository = new InMemoryUserRepository();
