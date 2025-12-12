import { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationsFeature.css";
import { BASE_URL } from "../../services/api";

type Notification = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const NotificationsFeature = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(res.data);
    };

    fetchNotifications();
  }, []);

  // Mark one notification as read
  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("token");

    // FIXED URL
    await axios.patch(
      `${BASE_URL}/notifications/${id}/read`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="notifications-feature">
      <h3>Notifications</h3>

      {notifications.length === 0 && (
        <p className="no-noti">No notifications yet</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`notification-card ${n.isRead ? "read" : "unread"}`}
          onClick={() => markAsRead(n.id)}
        >
          {/* Backend returns title/message */}
          <strong>{n.title}</strong>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeature;
