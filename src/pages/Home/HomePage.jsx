// src/pages/HomePage/HomePage.jsx
import { useState, useEffect } from "react";
import "./HomePage.css";
import PostCard from "../../components/PostCard/PostCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 Auto-filter posts based on tag
  const filteredPosts = activeTag
    ? posts.filter((post) => post?.tags?.includes(activeTag))
    : posts;

  // 🔥 Fetch Posts from Backend (PUBLIC ROUTE)
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");

      const postsArray = Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setPosts(postsArray);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔥 Tag Filter Handler
  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const clearFilter = () => {
    setActiveTag("");
  };

  return (
    <div className="home-container">
      <Sidebar setActiveTag={handleTagClick} />

      <main className="feed-area">
        {loading && <p>Loading posts...</p>}

        {!loading && filteredPosts.length === 0 && <p>No posts found...</p>}

        {filteredPosts.map((post) => (
          <PostCard
            key={post.id || post._id}
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
                style={{
                  cursor: "pointer",
                  fontWeight: activeTag === tag ? "bold" : "normal",
                }}
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
