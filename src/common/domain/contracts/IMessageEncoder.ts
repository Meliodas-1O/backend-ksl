export interface IMessageEncoder {
  /**
   * Encrypts a message using AES-256-CBC encryption.
   * @param message The plaintext message to encrypt.
   * @param key The encryption key.
   * @returns An object containing the encrypted message and the initialization vector (IV) used for encryption.
   */
  encryptMessage(message: string, key: Buffer): { encryptedMessage: string; iv: string };

  /**
   * Decrypts an encrypted message using AES-256-CBC decryption.
   * @param encryptedMessage The encrypted message to decrypt.
   * @param key The decryption key.
   * @param iv The initialization vector (IV) used during encryption.
   * @returns The decrypted plaintext message.
   */
  decryptMessage(encryptedMessage: string, key: Buffer, ivHex: string): string;
}
