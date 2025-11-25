import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        setPost(res.data);
      } catch (e) {
        console.error("Failed to fetch post:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-details-container">
      <div className="post-header">
        <h1>{post.title}</h1>

        <div className="post-author">
          <img
            src={post.author?.avatar || "https://i.pravatar.cc/80"}
            className="avatar"
            alt="author"
          />
          <span>@{post.author?.name}</span>
          <span className="post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="post-tags">
          {post.tags?.map((tag, idx) => (
            <span key={idx} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="post-content">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetails;
