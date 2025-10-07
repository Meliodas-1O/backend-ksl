/**
 * Interface for encoding and decoding messages using Base64.
 */
export interface IBase64MessageEncoder {
  /**
   * Encodes a message to Base64.
   * @param message The message to be encoded.
   * @returns The Base64 encoded string.
   */
  encode(message: string): string;

  /**
   * Decodes a Base64 encoded message.
   * @param encodedMessage The Base64 encoded message.
   * @returns The decoded message as a string.
   */
  decode(encodedMessage: string): string;
}
