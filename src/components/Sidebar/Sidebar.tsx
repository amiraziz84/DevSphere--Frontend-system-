import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
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

      <div className="sidebar-footer">
        <h4>Tags</h4>
        <div className="tags-list">
          <span>#react</span>
          <span>#javascript</span>
          <span>#nodejs</span>
          <span>#webdev</span>
          <span>#css</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
