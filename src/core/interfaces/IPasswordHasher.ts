export interface IPasswordHasher {
  /**
   * Hashes a plaintext password.
   * @param plain The raw password input.
   * @returns A secure hashed version of the password.
   */
  hash(plain: string): Promise<string>;

  /**
   * Compares a plaintext password with its hashed version.
   * @param plain The raw password input.
   * @param hashed The hashed password to compare against.
   * @returns True if they match, false otherwise.
   */
  compare(plain: string, hashed: string): Promise<boolean>;
}
