import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import "./SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const posts = [
    {
      title: "React Tips",
      author: "m_amir",
      date: "Nov 16",
      content: "Clean React code...",
      tags: ["react"],
      likes: 5,
      comments: 2,
    },
    {
      title: "Node.js Tricks",
      author: "dev_hassan",
      date: "Nov 15",
      content: "Efficient Node.js...",
      tags: ["nodejs"],
      likes: 3,
      comments: 1,
    },
  ];

  const users = [
    { username: "m_amir", name: "Muhammad Amir" },
    { username: "dev_hassan", name: "Hassan Ali" },
  ];

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.content.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page-container">
      <h1>Search results for “{query}”</h1>
      <div className="results-container">
        <h2 className="section-title">Users</h2>
        <div className="users-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u, idx) => (
              <div key={idx} className="user-row">
                @{u.username} — {u.name}
              </div>
            ))
          ) : (
            <p className="no-result">No users found.</p>
          )}
        </div>
        <h2 className="section-title">Posts</h2>
        <div className="posts-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((p, idx) => (
              <PostCard key={idx} post={p} />
            ))
          ) : (
            <p className="no-result">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
