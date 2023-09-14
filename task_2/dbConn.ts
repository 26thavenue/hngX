import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI } = process.env;
export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI as unknown as string);
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

// import mongoose from 'mongoose'

// export const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI as string);
//   } catch (error) {
//     console.log(error);
//   }
// };


