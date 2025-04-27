export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
      <p className="post-meta">
        By {post.author.name} on {new Date(post.timestamp).toLocaleDateString()}
      </p>
    </div>
  );
}
