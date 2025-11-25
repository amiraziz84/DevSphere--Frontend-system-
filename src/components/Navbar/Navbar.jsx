import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // THEME
  const [theme, setTheme] = useState("light");

  // SEARCH
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], posts: [], tags: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  // NOTIFICATIONS
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New follower: @john", time: "2m ago" },
    { id: 2, text: "Your post got 5 likes", time: "10m ago" },
    { id: 3, text: "New comment on your post", time: "1h ago" },
    { id: 4, text: "System update available", time: "Yesterday" },
  ]);

  // REFS
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const loginRef = useRef(null);

  const typingTimeout = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // DEBOUNCE SEARCH
  const handleSearch = (text) => {
    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      if (text.trim() === "") {
        setResults({ users: [], posts: [], tags: [] });
        return;
      }

      try {
        const res = await fetch(`http://localhost:<BACKEND_PORT>/search?q=${text}`);

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search request failed:", err);
      }
    }, 300);
  };

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
    handleSearch(value);
  };

  // ENTER KEY → FULL SEARCH PAGE
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search?q=${query}`);
      setShowDropdown(false);
    }
  };

  const handleSelect = (path) => {
    setQuery("");
    setShowDropdown(false);
    navigate(path);
  };

  // ESC + CLICK OUTSIDE HANDLERS
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setShowDropdown(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setShowLoginDropdown(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
        setShowNotifications(false);
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const fakeLogin = () => setIsLoggedIn(true);
  const fakeLogout = () => setIsLoggedIn(false);

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
          placeholder="Search posts, users, tags..."
          value={query}
          className="search-input"
          onChange={onChangeSearch}
          onKeyDown={handleSearchSubmit}
          onFocus={() => query && setShowDropdown(true)}
        />

        {showDropdown && query.length > 0 && (
          <div className="search-dropdown" ref={dropdownRef}>
            {results.users.length > 0 && (
              <>
                <strong>Users</strong>
                {results.users.map((u) => (
                  <div
                    key={u.username}
                    className="dropdown-item"
                    onClick={() => handleSelect(`/u/${u.username}`)}
                  >
                    @{u.username} — {u.name}
                  </div>
                ))}
              </>
            )}

            {results.posts.length > 0 && (
              <>
                <strong>Posts</strong>
                {results.posts.map((p) => (
                  <div
                    key={p.id}
                    className="dropdown-item"
                    onClick={() => handleSelect(`/posts/${p.id}`)}

                  >
                    {p.title}
                  </div>
                ))}
              </>
            )}

            {results.tags.length > 0 && (
              <>
                <strong>Tags</strong>
                {results.tags.map((t) => (
                  <div
                    key={t.name}
                    className="dropdown-item"
                    onClick={() => handleSelect(`/posts?tag=${t.name}`)}
                  >
                    #{t.name}
                  </div>
                ))}
              </>
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

        {/* NOTIFICATIONS */}
        <div className="notification-wrapper" ref={notificationsRef}>
          <button
            className="circle-btn notification-btn"
            onClick={() => setShowNotifications((prev) => !prev)}
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




        

        {/* LOGIN */}
        <div className="login-wrapper" >
          
            
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
               
              >
                Login
              </button>

              
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
