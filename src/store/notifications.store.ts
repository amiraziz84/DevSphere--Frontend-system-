import { create } from "zustand";

interface Notification {
  id: number;
  title: string;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  addNotification: (title: string) => void;
}

export const useNotificationsStore = create<NotificationStore>((set) => ({
  notifications: [
    { id: 1, title: "New Comment", read: false },
    { id: 2, title: "New Follower", read: true },
  ],

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  addNotification: (title) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), title, read: false },
      ],
    })),
}));
