import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import PostCard from "../../components/PostCard/PostCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api"; // backend connection

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const navigate = useNavigate();

  // Fetch posts from backend
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    api.get("/posts")
      .then(res => {
        setPosts(res.data.data); // backend returns { total, page, limit, data }
        setFilteredPosts(res.data.data);
      })
      .catch(err => console.error("Failed to fetch posts:", err));
  }, [navigate]);

  // Handle tag click
  const handleTagClick = (tag) => {
    setActiveTag(tag);
    const filtered = posts.filter((post) => post.tags.includes(tag));
    setFilteredPosts(filtered);
  };

  // Handle clear filter
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
