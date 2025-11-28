import "./PostCard.css";
import ReactionsFeature from "../../features/reactions/ReactionsFeature";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import React from "react";

/* ------------------------------
   MEMOIZED BANNER COMPONENT
--------------------------------*/
const BannerImage = React.memo(({ url, title }) => {
  const finalUrl = url.startsWith("http")
    ? url
    : `${BASE_URL}${url}`;

  return (
    <img
      src={finalUrl}
      alt={title || "Post image"}
      className="post-main-image"
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `${BASE_URL}/uploads/default.png`;
      }}
    />
  );
});

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const postId = post.id || post._id;

  // 👉 STABLE IMAGE URL
  const rawImageUrl =
    post.bannerUrl || post.image || "/uploads/default.png";

  // Date format
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown Date";

  return (
    <div className="post-card">
      
      {/* Header */}
      <div className="post-header">
        <div className="author-info">
          <img
            src={
              post.author?.avatar ||
              post.authorAvatar ||
              "https://i.pravatar.cc/40"
            }
            alt={post.author?.name || "Author"}
            className="author-avatar"
          />

          <div>
            <h4 className="author-name">
              {post.author?.name || "Unknown User"}
            </h4>
            <span className="post-date">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Memoized Banner Image -> No Blinking */}
      {(post.bannerUrl || post.image) && (
        <BannerImage url={rawImageUrl} title={post.title} />
      )}

      {/* Title & Snippet */}
      <div
        onClick={() => navigate(`/posts/${postId}`)}
        style={{ cursor: "pointer" }}
      >
        <h3 className="post-title">{post.title}</h3>

        <p className="post-snippet">
          {post.content?.slice(0, 150) || ""}
          {post.content && post.content.length > 150 ? "..." : ""}
        </p>
      </div>

      {/* Reactions */}
      <ReactionsFeature
        postId={postId}
        initialReactions={{
          like: post.likes ?? 0,
          love: post.love ?? 0,
          laugh: post.laugh ?? 0,
          sad: post.sad ?? 0,
        }}
      />

      {/* Footer */}
      <div className="post-reactions">
        <span>💬 {post.comments ?? 0}</span>
      </div>
    </div>
  );
};

export default React.memo(PostCard);
