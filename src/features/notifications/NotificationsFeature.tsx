import { useState } from "react";
import "./NotificationsFeature.css";

type Notification = {
  id: number;
  title: string;
  read: boolean;
};

const NotificationsFeature = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New Comment", read: false },
    { id: 2, title: "New Follower", read: true },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="notifications-feature">
      <h3>Notifications</h3>

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`notification-card ${n.read ? "read" : "unread"}`}
          onClick={() => markAsRead(n.id)}
        >
          {n.title}
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeature;
