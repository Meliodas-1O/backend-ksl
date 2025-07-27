export const emailValidator = {
  isValidEmail(email: unknown): boolean {
    if (typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
};
