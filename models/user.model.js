import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String, default: null },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Like' }
    ]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

const User = mongoose.model("User", userSchema);

export default User;