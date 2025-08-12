export class NotFoundError extends Error {
  constructor(public readonly error: string) {
    super(`Entity not found : ${error}`);
    this.name = "NotFoundError";
  }
}
