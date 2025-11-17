import { useState } from "react";
import "./NotificationsPage.css";

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New comment on your post",
      message: "John commented: 'Great article!'",
      read: false,
      date: "Nov 17, 2025, 10:30 AM",
    },
    {
      id: 2,
      title: "New follower",
      message: "Sarah started following you",
      read: true,
      date: "Nov 16, 2025, 02:15 PM",
    },
    {
      id: 3,
      title: "Post liked",
      message: "Ali liked your post 'Understanding React Hooks'",
      read: false,
      date: "Nov 15, 2025, 08:20 PM",
    },
  ]);

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

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
