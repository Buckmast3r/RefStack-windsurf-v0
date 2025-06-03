declare module 'bcrypt' {
  /**
   * Generate a hash for the given string.
   * @param s The string to hash.
   * @param salt The salt to use, or the number of rounds to generate a salt.
   * @param callback Function to call when the hash is generated.
   */
  export function hash(
    s: string,
    salt: string | number,
    callback?: (err: Error | undefined, hash: string) => void
  ): Promise<string>;
  
  /**
   * Compare the given data against the given hash.
   * @param s The string to compare.
   * @param hash The hash to compare against.
   * @param callback Function to call when the comparison is done.
   */
  export function compare(
    s: string,
    hash: string,
    callback?: (err: Error | undefined, same: boolean) => void
  ): Promise<boolean>;
  
  /**
   * Generate a salt with the given number of rounds.
   * @param rounds The number of rounds to use.
   * @param callback Function to call when the salt is generated.
   */
  export function genSalt(
    rounds?: number,
    callback?: (err: Error | undefined, salt: string) => void
  ): Promise<string>;
}
