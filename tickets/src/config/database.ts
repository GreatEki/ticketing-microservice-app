import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

    console.log("Connected to Auth MongoDB");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
