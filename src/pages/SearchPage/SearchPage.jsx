import { useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import "./SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  // Mock posts & users
  const posts = [
    { title: "React Tips", author: "m_amir", date: "Nov 16", content: "Clean React code...", tags: ["react"], likes: 5, comments: 2 },
    { title: "Node.js Tricks", author: "dev_hassan", date: "Nov 15", content: "Efficient Node.js...", tags: ["nodejs"], likes: 3, comments: 1 },
  ];

  const users = [
    { username: "m_amir", name: "Muhammad Amir" },
    { username: "dev_hassan", name: "Hassan Ali" },
  ];

  const filteredPosts = posts.filter(
    (p) => p.title.toLowerCase().includes(query.toLowerCase())
        || p.content.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search posts or users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div className="search-results">
        <h2>Users</h2>
        <div className="users-list">
          {filteredUsers.length ? filteredUsers.map((u, idx) => (
            <div key={idx} className="user-card">
              <span>@{u.username}</span>
              <span>{u.name}</span>
            </div>
          )) : <p>No users found.</p>}
        </div>

        <h2>Posts</h2>
        <div className="posts-list">
          {filteredPosts.length ? filteredPosts.map((p, idx) => (
            <PostCard key={idx} post={p} />
          )) : <p>No posts found.</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
