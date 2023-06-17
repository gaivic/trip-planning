import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userKey: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
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
