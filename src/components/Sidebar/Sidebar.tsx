import { Link } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  setActiveTag: (tag: string) => void;
}

const Sidebar = ({ setActiveTag }: SidebarProps) => {
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
            <span
              key={tag}
              className="tag-item"
              onClick={() => setActiveTag(tag)}
              style={{ cursor: "pointer" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
