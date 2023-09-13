import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  id: {
    type: String,
    unique: true,
    immutable: true,
  }, 
});

const User = mongoose.model("user", userSchema);

export default User;