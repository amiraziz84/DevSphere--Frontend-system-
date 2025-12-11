import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import "./PostsFeature.css";

const PostsFeature = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stable fetch function
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      const postsArray = Array.isArray(res.data?.data) ? res.data.data : [];

      // Normalizing tags safely
      const normalizedPosts = postsArray.map((post) => ({
        ...post,
        tags:
          post.tags?.flatMap((t) => {
            try {
              return JSON.parse(t); // if t is a JSON string
            } catch {
              return t; // if already normal
            }
          }) || [],
      }));

      setPosts(normalizedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <div className="posts-loading">Loading posts...</div>;
  }

  if (!posts.length) {
    return <div className="posts-empty">No posts available</div>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {post.banner && (
            <img src={post.banner} alt={post.title} className="post-banner" />
          )}
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>

          <div className="post-tags">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsFeature;
