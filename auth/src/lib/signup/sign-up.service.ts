import { BadRequestError } from "@greateki-ticket-ms-demo/common";
import { UserAttrs } from "../../interfaces";
import { User } from "../../models";

export const signup = async ({ email, password }: UserAttrs) => {
  // check if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) throw new BadRequestError("Email already in use");

  const newUser = User.buildNewDocument({ email, password });
  await newUser.save();

  return newUser;
};
