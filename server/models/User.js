import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userKey: {
      type: String,
    },
    picturePath: {
      type: String,
      default: "a",
    },
    friends: {
      type: [String],
      default: [],
    },
    bookmarks: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
