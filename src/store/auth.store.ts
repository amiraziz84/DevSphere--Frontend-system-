import { create } from "zustand";

interface UserType {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: UserType | null;
  token: string | null;
  isLoggedIn: boolean;

  login: (userData: UserType, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  login: (userData, token) =>
    set({
      user: userData,
      token: token,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    }),
}));
