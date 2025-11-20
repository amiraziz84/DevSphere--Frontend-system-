import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {

  const tags: string[] = ["react", "javascript", "nodejs", "webdev", "css"];

  return (
    <aside className="sidebar-container">
      {/* Sidebar Menu */}
      <nav className="sidebar-menu">
        <Link to="/" className="sidebar-item">
          <span>🏠</span> Home
        </Link>

        <Link to="/create-post" className="sidebar-item">
          <span>📝</span> Write Post
        </Link>

        <Link to="/bookmarks" className="sidebar-item">
          <span>🔖</span> Bookmarks
        </Link>

        <Link to="/notifications" className="sidebar-item">
          <span>🔔</span> Notifications
        </Link>

        <Link to="/search" className="sidebar-item">
          <span>🔎</span> Search
        </Link>
      </nav>

      {/* Tags Section */}
      <div className="sidebar-footer">
        <h4>Tags</h4>
        <div className="tags-list">
          {tags.map((tag) => (
            <a
              key={tag}
              href={`https://www.google.com/search?q=${tag}+posts`}
              target="_blank"
              rel="noopener noreferrer"
              className="tag-item"
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
