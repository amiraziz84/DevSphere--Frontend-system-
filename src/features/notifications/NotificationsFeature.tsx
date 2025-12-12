import { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationsFeature.css";
import { BASE_URL } from "../../services/api";


type Notification = {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const NotificationsFeature = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/notifications/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    };

    fetchNotifications();
  }, []);

  // Mark one notification as read
  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.patch(`${BASE_URL}/notifications/read/${id}`, {}, {  
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
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
