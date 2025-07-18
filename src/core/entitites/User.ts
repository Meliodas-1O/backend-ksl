import { Role } from "./Role";

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public password: string,
    public UserRole: Role,
    public readonly createdAt: Date = new Date()
  ) {}
}
