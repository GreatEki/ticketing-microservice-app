import mongoose from "mongoose";
import { UserAttrs, UserDoc, UserModel } from "../interfaces";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.statics.buildNewDocument = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export default User;
