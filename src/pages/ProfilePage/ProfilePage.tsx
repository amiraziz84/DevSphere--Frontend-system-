import "./ProfilePage.css";
import PostCard from "../../components/PostCard/PostCard";

const ProfilePage = () => {
  // Mock user data
  const user = {
    username: "m_amir",
    name: "Muhammad Amir Aziz",
    bio: "Fullstack Developer | MERN Stack | Open Source Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=12",
    followers: 120,
    following: 75,
    posts: [
      {
        title: "React Best Practices",
        content: "Some tips for writing clean React code...",
        date: "Nov 16, 2025",
        tags: ["react", "javascript"],
        likes: 10,
        comments: 2,
      },
      {
        title: "Node.js Tips",
        content: "Efficient Node.js patterns...",
        date: "Nov 15, 2025",
        tags: ["nodejs", "backend"],
        likes: 8,
        comments: 1,
      },
    ],
  };

  return (
    <div className="profile-container">
      {/* Left Sidebar - User Info */}
      <aside className="profile-sidebar">
        <div className="profile-card">
          <img src={user.avatar} alt="avatar" className="avatar" />
          <h2>{user.name}</h2>
          <p className="username">@{user.username}</p>
          <p className="bio">{user.bio}</p>

          <div className="follow-info">
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
            <span>Posts: {user.posts.length}</span>
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="profile-feed">
        <h2>Posts by {user.username}</h2>
        {user.posts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </main>

      {/* Right Sidebar (optional) */}
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
