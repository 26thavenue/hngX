import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI } = process.env;
export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI as unknown as string);
  } catch (err) {
    throw new Error(err as string);
  }
}

mongoose.connection.once("open", () => {
  console.log("mongo connected");
});

export async function disconnectDB() {
  await mongoose.disconnect();
}