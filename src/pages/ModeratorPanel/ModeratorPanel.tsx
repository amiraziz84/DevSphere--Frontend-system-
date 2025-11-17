import { useState } from "react";
import "./ModeratorPanel.css";

const ModeratorPanel = () => {
  // Mock reported posts
  const [reports] = useState([
    { id: 1, post: "Spam post about ads", user: "user123", date: "Nov 16, 2025" },
    { id: 2, post: "Offensive comment", user: "troll456", date: "Nov 15, 2025" },
  ]);

  return (
    <div className="moderator-panel-container">
      <h1>Moderator Dashboard</h1>

      <div className="reports-section">
        <h2>Reported Posts</h2>
        {reports.length ? (
          reports.map((r) => (
            <div key={r.id} className="report-card">
              <p><strong>Post:</strong> {r.post}</p>
              <p><strong>User:</strong> {r.user}</p>
              <p><strong>Date:</strong> {r.date}</p>
              <div className="actions">
                <button>Approve</button>
                <button>Remove</button>
                <button>Flag for Admin</button>
              </div>
            </div>
          ))
        ) : (
          <p>No reports at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ModeratorPanel;
