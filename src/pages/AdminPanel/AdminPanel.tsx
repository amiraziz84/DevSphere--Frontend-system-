import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
    reports: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Only users real API exists
        const res = await api.get("/users");

        const usersCount = Array.isArray(res.data) ? res.data.length : 0;

        setStats({
          users: usersCount,
          posts: 0, // no API yet
          comments: 0, // no API yet
          reports: 0, // no API yet
        });
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <h2>Loading admin data...</h2>;

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
