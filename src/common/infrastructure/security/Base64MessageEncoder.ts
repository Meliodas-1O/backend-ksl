import { IBase64MessageEncoder } from "../../domain/contracts/IBase64MessageEncoder";

/**
 * Class that implements the IBase64Encoder interface to handle Base64 encoding and decoding.
 */
export class Base64MessageEncoder implements IBase64MessageEncoder {
  /**
   * Encodes a message to Base64.
   * @param message The message to be encoded.
   * @returns The Base64 encoded string.
   */
  encode(message: string): string {
    return Buffer.from(message, "utf-8").toString("base64"); // Encoding to Base64
  }

  /**
   * Decodes a Base64 encoded message.
   * @param encodedMessage The Base64 encoded message.
   * @returns The decoded message as a string.
   */
  decode(encodedMessage: string): string {
    return Buffer.from(encodedMessage, "base64").toString("utf-8"); // Decoding from Base64
  }
}
export const encoder = new Base64MessageEncoder();
