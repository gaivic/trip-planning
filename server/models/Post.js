import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    postTitle: {
      type: String,
      required: true,
    },
    picturePath: String,
    location: String,
    days: String,
    schedule: {
      type: [
            [String]
      ],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    members:{
      type: [String],
      default: [],
    },
    dates: [String],
    published: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;