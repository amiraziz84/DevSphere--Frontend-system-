import "./PostCard.css";
import ReactionsFeature from "../../features/reactions/ReactionsFeature";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, setActiveTag, activeTag }) => {
  const navigate = useNavigate();

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="author-info">
          <img
            src={post.authorAvatar || "https://i.pravatar.cc/40"}
            alt={post.author}
            className="author-avatar"
          />
          <div>
            <h4 className="author-name">{post.author}</h4>
            <span className="post-date">{post.date}</span>
          </div>
        </div>

        
      </div>

      {/* Post Title & Snippet */}
      <div onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: "pointer" }}>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-snippet">{post.content}</p>
      </div>

      {/* Reaction Buttons Feature */}
      <ReactionsFeature
        postId={post.id || "temp-id"}
        initialReactions={{
          like: post.likes || 0,
          love: post.love || 0,
          laugh: post.laugh || 0,
          sad: post.sad || 0,
        }}
      />

      {/* Old Counts (optional) */}
      <div className="post-reactions">
        <span>💬 {post.comments || 0}</span>
      </div>
    </div>
  );
};

export default PostCard;
