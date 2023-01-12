import mongoose from "mongoose";
import { UserAttrs, UserDoc, UserModel } from "../interfaces";
import { Password } from "../services/password";

const UserSchema = new mongoose.Schema<UserAttrs>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.hashPassword(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

UserSchema.statics.buildNewDocument = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export default User;
