import { useState } from "react";
import "./HomePage.css";
import PostCard from "../../components/PostCard/PostCard";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {
  const posts = [
    {
      title: "React Best Practices",
      author: "m_amir",
      authorAvatar: "https://i.pravatar.cc/40?img=12",
      date: "Nov 16, 2025",
      content: "Some tips for writing clean React code...",
      tags: ["react", "javascript"],
      likes: 10,
      comments: 2,
    },
    {
      title: "Node.js Tips",
      author: "dev_hassan",
      authorAvatar: "https://i.pravatar.cc/40?img=5",
      date: "Nov 15, 2025",
      content: "Efficient Node.js patterns...",
      tags: ["nodejs", "backend"],
      likes: 8,
      comments: 1,
    },
    {
      title: "CSS Grid Layouts",
      author: "frontend_sara",
      authorAvatar: "https://i.pravatar.cc/40?img=8",
      date: "Nov 14, 2025",
      content: "Learn CSS grid layouts for responsive designs...",
      tags: ["css", "webdev"],
      likes: 12,
      comments: 3,
    },
  ];

  // State for filtered posts
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Handle tag click
  const handleTagClick = (tag) => {
    const filtered = posts.filter((post) => post.tags.includes(tag));
    setFilteredPosts(filtered);
  };

  // Handle clear filter
  const clearFilter = () => setFilteredPosts(posts);

  return (
    <div className="home-container">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* FEED */}
      <main className="feed-area">
        {filteredPosts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="right-sidebar">
        <div className="widget">
          <h3>Top Developers</h3>
          <ul>
            <li>@m_amir</li>
            <li>@dev_hassan</li>
            <li>@frontend_sara</li>
          </ul>
        </div>

        <div className="widget">
          <h3>Latest Tags</h3>
          <div className="tags">
            {["react", "javascript", "nodejs", "css", "webdev"].map((tag) => (
              <span key={tag} onClick={() => handleTagClick(tag)}>
                #{tag}
              </span>
            ))}
            <span
              style={{
                marginTop: "0.5rem",
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#4169e1",
                display: "inline-block",
              }}
              onClick={clearFilter}
            >
              Clear Filter
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
