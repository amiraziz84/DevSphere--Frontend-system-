// src/features/notifications/NotificationsPage.tsx
import { useState, useEffect } from "react";
import api from "../../services/api";
import "./NotificationsPage.css";

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>

      <div className="notifications-list">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`notification-card ${n.read ? "read" : "unread"}`}
            onClick={() => markAsRead(n.id)}
          >
            <h3>{n.title}</h3>
            <p>{n.message}</p>
            <span className="notification-date">{n.date}</span>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="no-notifications">No notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
