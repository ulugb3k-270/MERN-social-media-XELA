import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  userName: String,
  location: String,
  email: String,
  password: String,
  image: {type: String, default: "https://www.flaticon.com/free-icon/user_149071"},
  stories: {type: [Object], default: []},
  savedMessages: {type: [Object], default: []},
  friendRequests: { type: [String], default: [] },
  followers: { type: [Object], default: [] },
  followings: { type: [Object], default: [] },
  posts: { type: [Object], default: [] },
  createdAt: { type: Date, default: new Date() },
  varified: {
    type: Boolean,
    default: false
  }
});

const Auth = mongoose.model("users", authSchema);

export default Auth
