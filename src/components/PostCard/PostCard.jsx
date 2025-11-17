import "./PostCard.css";
import ReactionsFeature from "../../features/reactions/ReactionsFeature";

const PostCard = ({ post }) => {
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

        <div className="post-tags">
          {post.tags?.map((tag, idx) => (
            <span key={idx} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Post Title & Snippet */}
      <h3 className="post-title">{post.title}</h3>
      <p className="post-snippet">{post.content}</p>

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
