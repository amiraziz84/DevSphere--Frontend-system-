import "./PostDetails.css";

const PostDetails = () => {
  // Mock post data
  const post = {
    title: "Understanding React Hooks",
    content:
      "Hooks are functions that let you 'hook into' React state and lifecycle features from function components...",
    author: {
      username: "m_amir",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    date: "Nov 17, 2025",
    tags: ["react", "hooks", "javascript"],
    likes: 24,
    comments: [
      {
        username: "dev_hassan",
        avatar: "https://i.pravatar.cc/150?img=5",
        message: "Great explanation! Helped me a lot.",
      },
      {
        username: "frontend_sara",
        avatar: "https://i.pravatar.cc/150?img=8",
        message: "Thanks for sharing!",
      },
    ],
  };

  return (
    <div className="post-details-container">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-author">
          <img src={post.author.avatar} alt="avatar" className="avatar" />
          <span>@{post.author.username}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <div className="post-tags">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="post-content">{post.content}</div>

      <div className="post-stats">
        <span>❤️ {post.likes} Likes</span>
        <span>💬 {post.comments.length} Comments</span>
      </div>

      <div className="post-comments">
        <h3>Comments</h3>
        {post.comments.map((c, idx) => (
          <div key={idx} className="comment-card">
            <img src={c.avatar} alt="avatar" className="comment-avatar" />
            <div>
              <span className="comment-username">@{c.username}</span>
              <p>{c.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
