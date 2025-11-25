import "./Sidebar.css";

type SidebarProps = {
  setActiveTag: (tag: string) => void;
};

const Sidebar = ({ setActiveTag }: SidebarProps) => {
  const tags: string[] = ["react", "javascript", "nodejs", "webdev", "css"];

  return (
    <aside className="sidebar-container">
      {/* Sidebar Menu */}
      <nav className="sidebar-menu">
        <a href="/" className="sidebar-item">
          <span>🏠</span> Home
        </a>

        <a href="/create-post" className="sidebar-item">
          <span>📝</span> Write Post
        </a>

        <a href="/bookmarks" className="sidebar-item">
          <span>🔖</span> Bookmarks
        </a>

        <a href="/notifications" className="sidebar-item">
          <span>🔔</span> Notifications
        </a>

        <a href="/search" className="sidebar-item">
          <span>🔎</span> Search
        </a>
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
