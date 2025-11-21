import { useState } from "react";
import "./HomePage.css";
import PostCard from "../../components/PostCard/PostCard";
import Sidebar from "../../components/Sidebar/Sidebar";

const mockPosts = [
  {
    id: 1,
    title: "Learning React",
    content: "React is a powerful library for building UIs...",
    author: "m_amir",
    authorAvatar: "https://i.pravatar.cc/40?u=1",
    date: "2 hours ago",
    tags: ["react", "javascript", "webdev"],
  },
  {
    id: 2,
    title: "Node.js Basics",
    content: "Node.js allows you to run JavaScript on the server...",
    author: "dev_hassan",
    authorAvatar: "https://i.pravatar.cc/40?u=2",
    date: "5 hours ago",
    tags: ["nodejs", "javascript", "backend"],
  },
  {
    id: 3,
    title: "CSS Tricks",
    content: "Learn some amazing CSS tricks for modern layouts...",
    author: "frontend_sara",
    authorAvatar: "https://i.pravatar.cc/40?u=3",
    date: "1 day ago",
    tags: ["css", "webdev", "frontend"],
  },
];

const HomePage = () => {
  const [posts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [activeTag, setActiveTag] = useState("");

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    setFilteredPosts(posts.filter((post) => post.tags.includes(tag)));
  };

  const clearFilter = () => {
    setActiveTag("");
    setFilteredPosts(posts);
  };

  return (
    <div className="home-container">
      <Sidebar />

      <main className="feed-area">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            activeTag={activeTag}
            setActiveTag={handleTagClick}
          />
        ))}
      </main>

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
              <span
                key={tag}
                onClick={() => handleTagClick(tag)}
                style={{ fontWeight: activeTag === tag ? "bold" : "normal" }}
              >
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
