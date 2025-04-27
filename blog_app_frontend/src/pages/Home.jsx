import { useEffect, useState } from "react";
import { getPosts } from "../lib/api";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        toast.error("Failed to load posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="page">
      <h2>Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="no-posts">No posts available.</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
