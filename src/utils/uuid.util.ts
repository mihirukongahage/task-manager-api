import { v4 as uuidv4 } from "uuid";

/**
 * Generates a UUID.
 * @returns {string} A unique UUID.
 */
export function generateUUID(): string {
  return uuidv4();
}
