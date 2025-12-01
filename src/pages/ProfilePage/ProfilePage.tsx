import { useEffect, useState } from "react";
import "./ProfilePage.css";
import PostCard from "../../components/PostCard/PostCard";
import api from "../../services/api";

interface UserProfile {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");

        // Backend se profilePic ka proper URL bana rahe hain
        const profilePic = res.data.profilePic
          ? `http://localhost:3000${res.data.profilePic}`
          : "http://localhost:3000/uploads/profile/default.png";

        const userData: UserProfile = {
          username: res.data.username,
          name: res.data.name,
          bio: res.data.bio || "No bio added",
          avatar: profilePic,
          followers: res.data.followers || 0,
          following: res.data.following || 0,
        };

        setUser(userData);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      {/* Left Sidebar */}
      <aside className="profile-sidebar">
        <div className="profile-card">
          <img src={user.avatar} alt="avatar" className="avatar" />

          <h2>{user.name}</h2>
          <p className="username">@{user.username}</p>
          <p className="bio">{user.bio}</p>

          <div className="follow-info">
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="profile-feed">
        <h2>Posts by {user.username}</h2>
        <p>Coming soon — Connect posts API here</p>
      </main>

      {/* Right Sidebar */}
      <aside className="profile-right-sidebar">
        <div className="widget">
          <h3>Top Tags</h3>
          <div className="tags">
            <span>#react</span>
            <span>#nodejs</span>
            <span>#css</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfilePage;
