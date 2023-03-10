import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compareHashPassword(
    savedPassword: string,
    suppliedPasword: string
  ) {
    const [hashedPassword, salt] = savedPassword.split(".");

    const buf = (await scryptAsync(suppliedPasword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
