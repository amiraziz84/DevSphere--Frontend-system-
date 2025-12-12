import { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationsFeature.css";
import { BASE_URL } from "../../services/api"; // Make sure BASE_URL is correct

type Notification = {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const NotificationsFeature = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark a single notification as read
  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.patch(
        `${BASE_URL}/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  return (
    <div className="notifications-feature">
      <h3>Notifications</h3>

      {loading && <p>Loading notifications...</p>}

      {!loading && notifications.length === 0 && (
        <p className="no-noti">No notifications yet</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`notification-card ${n.read ? "read" : "unread"}`}
          onClick={() => markAsRead(n.id)}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeature;
