import { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  // Mock data
  const [stats] = useState({
    users: 120,
    posts: 340,
    comments: 890,
    reports: 12,
  });

  return (
    <div className="admin-panel-container">
      <h1>Admin Dashboard</h1>

      <div className="stats-cards">
        <div className="card">
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="card">
          <h3>Posts</h3>
          <p>{stats.posts}</p>
        </div>
        <div className="card">
          <h3>Comments</h3>
          <p>{stats.comments}</p>
        </div>
        <div className="card">
          <h3>Reported</h3>
          <p>{stats.reports}</p>
        </div>
      </div>

      <div className="user-management">
        <h2>Manage Users</h2>
        <p>Feature coming soon: promote/demote/ban users.</p>
      </div>

      <div className="reports-section">
        <h2>Reported Posts</h2>
        <p>Feature coming soon: review and act on reports.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
