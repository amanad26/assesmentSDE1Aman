import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getPosts, createPost, updatePost, deletePost } from "../lib/api";
import toast from "react-hot-toast";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const onSubmit = async (data) => {
    try {
      if (editingPost) {
        await updatePost(editingPost._id, data);
        toast.success("Post updated successfully");
        setEditingPost(null);
      } else {
        await createPost(data);
        toast.success("Post created successfully");
      }
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    reset({ title: post.title, content: post.content });
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  };

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <div className="card">
        <h3>{editingPost ? "Update Post" : "Create Post"}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-group">
            <input
              {...register("title")}
              placeholder="Post Title"
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>
          <div className="form-group">
            <textarea
              {...register("content")}
              placeholder="Post Content"
              rows={5}
              className={errors.content ? "input-error" : ""}
            />
            {errors.content && (
              <p className="error">{errors.content.message}</p>
            )}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingPost ? "Update Post" : "Create Post"}
            </button>
            {editingPost && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setEditingPost(null);
                  reset();
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <h3>Manage Posts</h3>
      {posts.length === 0 ? (
        <p className="no-posts">No posts available.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post._id} className="post-item">
              <div>
                <h4>{post.title}</h4>
                <p>{post.content.substring(0, 100)}...</p>
              </div>
              <div className="post-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
