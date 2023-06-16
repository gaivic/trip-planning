import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    postTitle: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    picturePath: String,
    location: String,
    days: String,
    schedule: {
      type: [
        {
          aday: {
            type: [{placeId: String}],
            default: [],
          }
        },
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