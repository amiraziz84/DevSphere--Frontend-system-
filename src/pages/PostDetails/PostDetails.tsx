import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api"; // axios instance
import "./PostDetails.css";

const BACKEND_URL = "https://ravishing-nature-production-31c7.up.railway.app";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
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
            src={
              post.author?.profilePic
                ? `${BACKEND_URL}${post.author.profilePic}`
                : "https://i.pravatar.cc/80"
            }
            className="avatar"
            alt="author"
          />
          <span>@{post.author?.name}</span>
          <span className="post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="post-tags">
          {post.tags?.map((tag: string, idx: number) => (
            <span key={idx} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="post-content">{post.content}</div>
    </div>
  );
};

export default PostDetails;
