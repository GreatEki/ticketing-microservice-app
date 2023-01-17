import { BadRequestError } from "../../errors";
import { User } from "../../models";
import { PasswordManager } from "../../services/password";

export async function signIn(email: string, password: string) {
  const existingUser = await User.findOne({ email });

  if (!existingUser) throw new BadRequestError("Invalid credentials");

  const pwMatch = await PasswordManager.compareHashPassword(
    existingUser.password,
    password
  );

  if (!pwMatch) throw new BadRequestError("Invalid credentials");

  return existingUser;
}
