import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

// Pages
import HomePage from "./pages/Home/HomePage";
import PostDetails from "./pages/PostDetails/PostDetails";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import BookmarksPage from "./pages/BookmarksPage/BookmarksPage";

// Admin / Moderator
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import ModeratorPanel from "./pages/ModeratorPanel/ModeratorPanel";

// Features Pages
import PostsFeature from "./features/posts/PostsFeature";
import CommentsFeature from "./features/comments/CommentsFeature";
import ReactionsFeature from "./features/reactions/ReactionsFeature";

// Auth
import { AuthProvider, ProtectedRoute } from "./features/auth/AuthFeature";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Main */}
          <Route path="/" element={<HomePage />} />

          {/* Backend-style Endpoints */}
          <Route path="/posts" element={<PostsFeature />} />
          <Route path="/comments" element={<CommentsFeature postId={1} />} />
          <Route path="/reactions" element={<ReactionsFeature postId={1} />} />
          <Route path="/auth" element={<LoginPage />} />

          {/* Posts */}
          <Route path="/post/:slug" element={<PostDetails />} />
          <Route
            path="/create-post"
            element={<ProtectedRoute><CreatePost /></ProtectedRoute>}
          />
          <Route
            path="/edit/:postId"
            element={<ProtectedRoute><EditPost /></ProtectedRoute>}
          />

          {/* Users */}
          <Route path="/u/:username" element={<ProfilePage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Other Pages */}
          <Route
            path="/notifications"
            element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/bookmarks"
            element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>}
          />

          {/* Roles */}
          <Route
            path="/admin"
            element={<ProtectedRoute roles={["admin"]}><AdminPanel /></ProtectedRoute>}
          />
          <Route
            path="/moderator"
            element={<ProtectedRoute roles={["moderator","admin"]}><ModeratorPanel /></ProtectedRoute>}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
