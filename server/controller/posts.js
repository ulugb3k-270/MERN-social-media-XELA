import PostMessage from "../schema/postSchema.js";
import User from "../schema/authSchema.js";
import mongoose from "mongoose";

export const getPost = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    const userId = post.creatorId;

    const { posts } = await User.findById(userId);

    if (true) {
      posts.push(newPost);
    }

    await User.findByIdAndUpdate(userId, { ...userId, posts: posts });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id ${id}`);

    const post = await PostMessage.findById(id);

    // Check user if he liked
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // Like the post
      post.likes.push(req.userId);
    } else {
      // dislike the past
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const savePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id ${id}`);

    const post = await PostMessage.findById(id);

    const user = await User.findById(req.userId);

    const index = await user.savedMessages.findIndex(
      (item) => String(item._id) === String(id)
    );

    if (index === -1) {
      user.savedMessages.push(post);
    } else {
      user.savedMessages = user.savedMessages.filter(
        (item) => String(item._id) !== String(id)
      );
    }

    await User.findByIdAndUpdate(req.userId, {
      ...user,
    });

    const updatedUser = await User.findById(req.userId);
    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
