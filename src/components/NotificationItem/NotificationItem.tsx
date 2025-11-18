import "./NotificationItem.css";

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
  return (
    <div className="notification-item">
      {/* User Avatar */}
      <img
        src={notification.avatar || "https://i.pravatar.cc/40"}
        alt="avatar"
        className="notification-avatar"
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
