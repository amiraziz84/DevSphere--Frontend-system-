import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PostCard from "../PostCard/PostCard"; // Agar posts ko dropdown me PostCard se dikhana ho
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // THEME
  const [theme, setTheme] = useState("light");

  // SEARCH
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    posts: [],
    users: [],
    tags: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);

  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // NOTIFICATIONS
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New follower: @john", time: "2m ago" },
    { id: 2, text: "Your post got 5 likes", time: "10m ago" },
    { id: 3, text: "New comment on your post", time: "1h ago" },
    { id: 4, text: "System update available", time: "Yesterday" },
  ]);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const typingTimeout = useRef(null);

  // LOGIN STATE
  useEffect(() => {
    const updateLoginState = () => {
      const token = localStorage.getItem("auth_token");
      setIsLoggedIn(!!token);
    };

    updateLoginState();
    window.addEventListener("auth-change", updateLoginState);
    return () =>
      window.removeEventListener("auth-change", updateLoginState);
  }, []);

  // THEME
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ---------------- SEARCH ----------------
  const handleSearch = (text) => {
    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      if (!text.trim()) {
        setResults({ posts: [], users: [], tags: [] });
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/search?q=${text}`);
        const data = await res.json();

        const lowerQuery = text.toLowerCase();

        // FILTER POSTS BY TITLE OR TAGS
        const matchedPosts = (data.posts || []).filter(
          (p) =>
            p.title?.toLowerCase().includes(lowerQuery) ||
            p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );

        // USERS with username fallback
        const users = (data.users || []).map((u) => ({
          ...u,
          username: u.name || u.email?.split("@")[0],
        }));

        // TAGS filter
        const matchedTags = (data.tags || []).filter((t) =>
          t.toLowerCase().includes(lowerQuery)
        );

        setResults({
          posts: matchedPosts,
          users: users,
          tags: matchedTags,
        });

        setShowDropdown(true);
      } catch (e) {
        console.log("Search error:", e);
      }
    }, 300);
  };

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
    handleSearch(value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query}`);
      setShowDropdown(false);
    }
  };

  const handleSelect = (type, item) => {
    setQuery("");
    setShowDropdown(false);

    if (type === "post") navigate(`/posts/${item.id || item._id}`);
    if (type === "user") navigate(`/user/${item.username}`);
    if (type === "tag") navigate(`/posts?tag=${item}`);
  };

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setShowNotifications(false);
      }
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

        {showDropdown && query && (
          <div className="search-dropdown" ref={dropdownRef}>
            {/* POSTS */}
            {results.posts.length > 0 && (
              <div>
                <strong>Posts</strong>
                {results.posts.map((p) => (
                  <div
                    key={p.id || p._id}
                    className="dropdown-item"
                    onClick={() => handleSelect("post", p)}
                  >
                    {p.title}
                  </div>
                ))}
              </div>
            )}

            {/* USERS */}
            {results.users.length > 0 && (
              <div>
                <strong>Users</strong>
                {results.users.map((u) => (
                  <div
                    key={u.id || u._id}
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
