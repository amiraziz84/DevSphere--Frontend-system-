import React from "react";
import "./PostCard.css";
import ReactionsFeature from "../../features/reactions/ReactionsFeature";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";

// ======================
// Banner Image Component
// ======================
const BannerImage = React.memo(({ url, title }) => {
  const finalUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  return (
    <div className="image-container">
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
    </div>
  );
});

// ======================
// Main PostCard Component
// ======================
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const postId = post.id || post._id;

  const rawImageUrl = post.bannerUrl || post.image || "/uploads/default.png";

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown Date";

  // ================================
  // FIXED: Stable Profile Pic URL
  // ================================
  const authorAvatarUrl = post.author?.profilePic
    ? post.author.profilePic.startsWith("https")
      ? post.author.profilePic
      : `${BASE_URL}${post.author.profilePic}`
    // : `${BASE_URL}/uploads/profile/default.png`;
       : null;

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="author-info">
          <img
            src={`https://ravishing-nature-production-31c7.up.railway.app/uploads/profile/profile_4512283c-81bd-40aa-9f16-1031501dce7c.jpeg`}
            alt={post.author?.name || "Author"}
            className="author-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${BASE_URL}/uploads/profile/default.png`;
            }}
          />

          <div>
            <h4 className="author-name">
              {post.author?.name || "Unknown User"}
            </h4>
            <span className="post-date">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      {(post.bannerUrl || post.image) && (
        <BannerImage url={rawImageUrl} title={post.title} />
      )}

      {/* Main Content */}
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

      {/* Comments Count */}
      <div className="post-reactions">
        <span>💬 {post.comments ?? 0}</span>
      </div>
    </div>
  );
};

export default React.memo(PostCard);
