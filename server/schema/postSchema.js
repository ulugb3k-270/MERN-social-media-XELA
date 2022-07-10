import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  creatorId: String,
  creatorName: String,
  creatorImage: String,
  creatorUsername: String,
  creatorLocation: String,
  message: String,
  image: String,
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage
