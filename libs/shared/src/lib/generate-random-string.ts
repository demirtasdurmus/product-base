const DEFAULT_LENGTH = 10;
/**
 * Generate a random string of the given length
 * @param length - The length of the string to generate
 * @returns A random string of the given length
 * @throws An error if the length is less than 0 or greater than 34
 * @example
 * const randomString = generateRandomString(10);
 * console.log(randomString);
 * // Output: "abcdefghij"
 */
export function generateRandomString(length?: number): string {
  if (length === undefined || length === null) {
    length = DEFAULT_LENGTH;
  }
  if (length <= 0) {
    throw new Error('Length must be greater than 0');
  }
  if (length > 34) {
    throw new Error('Length must be less than 36');
  }
  let out = '';
  while (out.length < length) {
    out += Math.random().toString(36).slice(2);
  }
  return out.slice(0, length);
}
