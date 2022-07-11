import express from "express";
import { getPost, createPost, likePost, savePost } from "../controller/posts.js";
import  auth from "../middleware/auth.js"
const router = express.Router();

router.get("/", getPost);
router.post("/", auth, createPost)
router.patch('/:id/likePost', auth, likePost)
router.post("/:id/saveMessage", auth, savePost)

export default router;
