import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/api";
import "./NotificationsFeature.css";

type Notification = {
  id: string;
  title?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const NotificationsFeature = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const res = await axios.get(`${BASE_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  // Mark one notification as read
  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      await axios.patch(`${BASE_URL}/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <div className="notifications-feature">
      <h3>Notifications</h3>

      {notifications.length === 0 && <p className="no-noti">No notifications yet</p>}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`notification-card ${n.isRead ? "read" : "unread"}`}
          onClick={() => markAsRead(n.id)}
        >
          {n.title ? <strong>{n.title}</strong> : null}
          <p>{n.message}</p>
          <small>{new Date(n.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeature;
