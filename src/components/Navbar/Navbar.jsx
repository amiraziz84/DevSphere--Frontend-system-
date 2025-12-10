import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../../services/api"; // Axios instance with BASE_URL
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // THEME
  const [theme, setTheme] = useState("light");

  // SEARCH
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ posts: [], users: [], tags: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  const typingTimeout = useRef(null);
  const searchRef = useRef();
  const dropdownRef = useRef();

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef();

  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on load and subscribe to auth changes
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) setIsLoggedIn(true);

    const listener = () => {
      const newToken = localStorage.getItem("auth_token");
      setIsLoggedIn(!!newToken);
    };

    window.addEventListener("auth-change", listener);
    return () => window.removeEventListener("auth-change", listener);
  }, []);

  // SEARCH — capture input only
  const onChangeSearch = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  // Fetch search results
  useEffect(() => {
    if (!query.trim()) {
      setResults({ posts: [], users: [], tags: [] });
      setShowDropdown(false);
      return;
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      try {
        const res = await api.get(`/search?q=${query}`);
        const data = res.data;

        setResults({
          posts: data.posts || [],
          users: data.users || [],
          tags: data.tags || [],
        });

        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);
  }, [query]);

  // Select search result
  const handleSelect = (type, item) => {
    setShowDropdown(false);
    if (type === "post") navigate(`/posts/${item.id}`);
    if (type === "user") navigate(`/profile/${item.username}`);
    if (type === "tag") navigate(`/tag/${item}`);
  };

  // Enter key submit
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query}`);
      setShowDropdown(false);
    }
  };

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo">
          DevSphere
        </Link>
      </div>

      {/* SEARCH */}
      <div className="nav-middle" ref={searchRef}>
        <input
          type="text"
          className="search-input"
          placeholder="Search posts, users, tags..."
          value={query}
          onChange={onChangeSearch}
          onKeyDown={handleSearchSubmit}
          onFocus={() => query && setShowDropdown(true)}
        />

        {showDropdown && (
          <div className="search-dropdown" ref={dropdownRef}>
            {/* POSTS */}
            {results.posts.length > 0 && (
              <>
                <strong>Posts</strong>
                {results.posts.map((p) => (
                  <div
                    key={p.id}
                    className="dropdown-item"
                    onClick={() => handleSelect("post", p)}
                  >
                    {p.title}
                  </div>
                ))}
              </>
            )}

            {/* USERS */}
            {results.users.length > 0 && (
              <div>
                <strong>Users</strong>
                {results.users.map((u) => (
                  <div
                    key={u.id}
                    className="dropdown-item"
                    onClick={() => handleSelect("user", u)}
                  >
                    @{u.username}
                  </div>
                ))}
              </div>
            )}

            {/* TAGS */}
            {results.tags.length > 0 && (
              <div>
                <strong>Tags</strong>
                {results.tags.map((t, i) => (
                  <div
                    key={i}
                    className="dropdown-item"
                    onClick={() => handleSelect("tag", t)}
                  >
                    #{t}
                  </div>
                ))}
              </div>
            )}

            {/* EMPTY */}
            {results.posts.length === 0 &&
              results.users.length === 0 &&
              results.tags.length === 0 && (
                <div className="dropdown-item">No results found</div>
              )}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button
          className="circle-btn"
          onClick={() => navigate("/create-post")}
        >
          ✏️
        </button>

        <button
          className="circle-btn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Notifications */}
        <div className="notification-wrapper" ref={notificationsRef}>
          <button
            className="circle-btn notification-btn"
            onClick={() => setShowNotifications((p) => !p)}
          >
            🔔
            {notifications.length > 0 && (
              <span className="notif-count">{notifications.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notif-dropdown">
              {notifications.map((n) => (
                <div key={n.id} className="dropdown-item notif-item">
                  <div className="notif-text">{n.text}</div>
                  <div className="notif-time">{n.time}</div>
                </div>
              ))}

              <div
                className="dropdown-item view-all"
                onClick={() => {
                  navigate("/notifications");
                  setShowNotifications(false);
                }}
              >
                View All Notifications
              </div>
            </div>
          )}
        </div>

        {/* Login */}
        <div className="login-wrapper">
          {isLoggedIn ? (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
