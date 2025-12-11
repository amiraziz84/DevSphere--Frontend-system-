import "./PostCard.css";
import ReactionsFeature from "../../features/reactions/ReactionsFeature";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import React from "react";

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

  // FIXED: Profile Pic URL (no white blink, no broken image)
  const authorAvatarUrl = post.author?.profilePic
    ? post.author.profilePic.startsWith("http")
      ? post.author.profilePic
      : `${BASE_URL}${post.author.profilePic.replace("//", "/")}`
    : `${BASE_URL}/uploads/profile/default.png`;

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="author-info">
          <img
            src={authorAvatarUrl}
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

      {(post.bannerUrl || post.image) && (
        <BannerImage url={rawImageUrl} title={post.title} />
      )}

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

      <ReactionsFeature
        postId={postId}
        initialReactions={{
          like: post.likes ?? 0,
          love: post.love ?? 0,
          laugh: post.laugh ?? 0,
          sad: post.sad ?? 0,
        }}
      />

      <div className="post-reactions">
        <span>💬 {post.comments ?? 0}</span>
      </div>
    </div>
  );
};

export default React.memo(PostCard);
