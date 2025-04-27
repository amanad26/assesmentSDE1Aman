import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    const user = await User.create({
      name: "Regular User",
      email: "user@example.com",
      password: "user123",
      role: "user",
    });

    await Post.create([
      {
        title: "First Blog Post",
        content: "This is the content of the first blog post.",
        author: admin._id,
      },
      {
        title: "Second Blog Post",
        content: "This is the content of the second blog post.",
        author: admin._id,
      },
    ]);

    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
