import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    password: { type: String },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
    tokenVersion: { type: Number, default: 0 },
  },
  {
    // auto create createdAt and updatedAt fields
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
