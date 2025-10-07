import * as crypto from "crypto";
import { IMessageEncoder } from "../../domain/contracts/IMessageEncoder";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16; // 16 bytes IV for AES

export class MessageEncoder implements IMessageEncoder {
  /**
   * Encrypts a message using AES-256-CBC encryption.
   * @param message The plaintext message to encrypt.
   * @param key The encryption key.
   * @returns An object containing the encrypted message and the initialization vector (IV) used for encryption.
   */
  encryptMessage(message: string, key: Buffer): { encryptedMessage: string; iv: string } {
    const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv); // Create the cipher with the key and IV
    let encrypted = cipher.update(message, "utf-8", "hex");
    encrypted += cipher.final("hex"); // Finalize encryption
    return { encryptedMessage: encrypted, iv: iv.toString("hex") }; // Return encrypted message + IV
  }

  /**
   * Decrypts an encrypted message using AES-256-CBC decryption.
   * @param encryptedMessage The encrypted message to decrypt.
   * @param key The decryption key.
   * @param iv The initialization vector (IV) used during encryption.
   * @returns The decrypted plaintext message.
   */
  decryptMessage(encryptedMessage: string, key: Buffer, ivHex: string): string {
    const iv = Buffer.from(ivHex, "hex"); // Convert IV from hex to Buffer
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv); // Create the decipher with the key and IV
    let decrypted = decipher.update(encryptedMessage, "hex", "utf-8");
    decrypted += decipher.final("utf-8"); // Finalize decryption
    return decrypted;
  }
}

export const messageEncoderSingleton = new MessageEncoder();
