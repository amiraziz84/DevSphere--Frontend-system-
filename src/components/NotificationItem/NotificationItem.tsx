import "./NotificationItem.css";
import { BASE_URL } from "../../services/api";

interface NotificationItemProps {
  notification: {
    id?: string;
    username: string;
    avatar?: string;
    message: string;
    time: string;
    read: boolean;
  };
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const finalAvatar = notification.avatar
    ? notification.avatar.startsWith("http")
      ? notification.avatar
      : `${BASE_URL}${notification.avatar}`
    : "https://i.pravatar.cc/40";

  return (
    <div className="notification-item">
      {/* User Avatar */}
      <img
        src={finalAvatar}
        alt="avatar"
        className="notification-avatar"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = "https://i.pravatar.cc/40";
        }}
      />

      {/* Notification Content */}
      <div className="notification-content">
        <p className="notification-text">
          <strong>{notification.username}</strong> {notification.message}
        </p>
        <span className="notification-time">{notification.time}</span>
      </div>

      {/* Unread Dot */}
      {!notification.read && <span className="unread-dot"></span>}
    </div>
  );
};

export default NotificationItem;
