import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Mock data
  const posts = [
    { id: 1, title: "React Best Practices" },
    { id: 2, title: "Node.js Tips" },
    { id: 3, title: "CSS Grid Layouts" },
  ];

  const users = [
    { username: "m_amir", name: "Muhammad Amir Aziz" },
    { username: "dev_hassan", name: "Hassan Ali" },
    { username: "frontend_sara", name: "Sara Khan" },
  ];

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    setQuery("");
    setShowDropdown(false);
    navigate(path);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">DevSphere</Link>
      </div>

      <div className="nav-middle">
        <input
          type="text"
          placeholder="Search posts or users..."
          className="search-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(e.target.value.length > 0);
          }}
        />

        {showDropdown && (
          <div className="search-dropdown">
            {filteredUsers.length > 0 && (
              <>
                <strong>Users</strong>
                {filteredUsers.map((u) => (
                  <div
                    key={u.username}
                    className="dropdown-item"
                    onClick={() => handleSelect(`/u/${u.username}`)}
                  >
                    @{u.username} - {u.name}
                  </div>
                ))}
              </>
            )}

            {filteredPosts.length > 0 && (
              <>
                <strong>Posts</strong>
                {filteredPosts.map((p) => (
                  <div
                    key={p.id}
                    className="dropdown-item"
                    onClick={() => handleSelect(`/post/${p.id}`)}
                  >
                    {p.title}
                  </div>
                ))}
              </>
            )}

            {filteredPosts.length === 0 && filteredUsers.length === 0 && (
              <div className="dropdown-item">No results found</div>
            )}
          </div>
        )}
      </div>

      <div className="nav-right">
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <Link to="/create-post" className="nav-btn">Create Post</Link>
        <Link to="/notifications" className="nav-icon">🔔</Link>
        <Link to="/login" className="nav-btn login-btn">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
