export class UserNotFoundError extends Error {
  constructor(public readonly errors: string) {
    super(`User not found: ${errors}`);
    this.name = "UserNotFoundError";
  }
}
