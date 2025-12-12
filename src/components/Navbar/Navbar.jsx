import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api, { BASE_URL } from "../../services/api"; 
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

  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch Notifications
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data || []);
      } catch (err) {
        console.error("Notifications fetch error:", err);
      }
    };

    fetchNotifications();
  }, []);

  // SEARCH HANDLING
  const onChangeSearch = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults({ posts: [], users: [], tags: [] });
      return setShowDropdown(false);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      try {
        const res = await api.get(`/search?q=${query}`);
        setResults({
          posts: res.data.posts || [],
          users: res.data.users || [],
          tags: res.data.tags || [],
        });
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);
  }, [query]);

  const handleSelect = (type, item) => {
    setShowDropdown(false);

    if (type === "post") navigate(`/posts/${item.id}`);
    if (type === "user") navigate(`/u/${item.username}`);
    if (type === "tag") navigate(`/search?tag=${item}`);
  };

  // Enter search
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query}`);
      setShowDropdown(false);
    }
  };

  // Close dropdowns when clicking outside
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
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
              <>
                <strong>Users</strong>
                {results.users.map((u) => (
                  <div
                    key={u.id}
                    className="dropdown-item"
                    onClick={() => handleSelect("user", u)}
                  >
                    <img
                      src={
                        u.profilePic
                          ? `${BASE_URL}${u.profilePic}`
                          : `${BASE_URL}/uploads/profile/default.png`
                      }
                      alt="avatar"
                      className="dropdown-avatar"
                    />
                    @{u.username}
                  </div>
                ))}
              </>
            )}

            {/* TAGS */}
            {results.tags.length > 0 && (
              <>
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
              </>
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

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* Create post */}
        <button className="circle-btn" onClick={() => navigate("/create-post")}>
          ✏️
        </button>

        {/* Theme toggle */}
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
            {notifications.filter((n) => !n.isRead).length > 0 && (
              <span className="notif-count">
                {notifications.filter((n) => !n.isRead).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notif-dropdown">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="dropdown-item notif-item">
                    <div className="notif-text">{n.text}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                ))
              ) : (
                <div className="dropdown-item">No notifications</div>
              )}

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

        {/* Login/Logout */}
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
    </nav>
  );
}

export default Navbar;
