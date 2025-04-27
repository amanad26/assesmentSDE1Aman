import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

// Create post (Admin only)
export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({
    title,
    content,
    author: req.user._id,
  });
  res.status(201).json(post);
});

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author", "name");
  res.json(posts);
});

// Update post (Admin only)
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  const updatedPost = await post.save();
  res.json(updatedPost);
});

// Delete post (Admin only)
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  await Post.deleteOne({ _id: req.params.id });
  res.json({ message: "Post removed" });
});
