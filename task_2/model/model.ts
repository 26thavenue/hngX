import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
});
const User = mongoose.model("user", userSchema);

export default User;