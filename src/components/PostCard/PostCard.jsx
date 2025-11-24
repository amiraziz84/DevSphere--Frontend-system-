import "./PostCard.css";
import ReactionsFeature from "../../features/reactions/ReactionsFeature";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
const navigate = useNavigate();

return ( <div className="post-card">
{/* Post Header */} <div className="post-header"> <div className="author-info">
<img
src={
post.author?.avatar ||
post.authorAvatar ||
"[https://i.pravatar.cc/40](https://i.pravatar.cc/40)"
}
alt={post.author?.name || "author"}
className="author-avatar"
/>


      <div>
        <h4 className="author-name">
          {post.author?.name || "Unknown User"}
        </h4>
        <span className="post-date">
          {post.date || "Unknown Date"}
        </span>
      </div>
    </div>
  </div>

  {/* Post Image */}
  {post?.image && (
    <img
      src={post.image}
      alt="Post"
      className="post-main-image"
    />
  )}

  {/* Title & Content */}
  <div
    onClick={() => navigate(`/post/${post.id || post._id}`)}
    style={{ cursor: "pointer" }}
  >
    <h3 className="post-title">{post.title}</h3>
    <p className="post-snippet">{post.content}</p>
  </div>

  {/* Reactions */}
  <ReactionsFeature
    postId={post.id || post._id}
    initialReactions={{
      like: post.likes || 0,
      love: post.love || 0,
      laugh: post.laugh || 0,
      sad: post.sad || 0,
    }}
  />

  {/* Footer */}
  <div className="post-reactions">
    <span>💬 {post.comments || 0}</span>
  </div>
</div>


);
};

export default PostCard;
