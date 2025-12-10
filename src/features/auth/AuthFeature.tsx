import  { createContext, useContext, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import "./AuthFeature.css";

// ------------------
// Types
// ------------------
type User = {
  username: string;
  role: "user" | "moderator" | "admin";
  
};

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// ------------------
// Create Context
// ------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ------------------
// AuthProvider
// ------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("auth_token", token); //  <-- FIXED
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token"); //  <-- FIXED
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ------------------
// Custom hook
// ------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// ------------------
// ProtectedRoute
// ------------------
interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: ("user" | "moderator" | "admin")[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <>{children}</>; // ReactNode support for multiple children
};
