import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);

    console.log("Connected to Auth MongoDB");
  } catch (err) {
    console.error(err);
  }
};

export const mongooseConnection = mongoose.connection;

export default connectDB;
