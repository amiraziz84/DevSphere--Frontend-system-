import PostCard from "../../components/PostCard/PostCard";
import "./BookmarksPage.css";

const BookmarksPage = () => {
  const bookmarkedPosts = [
    { title: "React Best Practices", author: "m_amir", date: "Nov 16", content: "Some tips...", tags: ["react"], likes: 10, comments: 2 },
    { title: "Node.js Tips", author: "dev_hassan", date: "Nov 15", content: "Efficient Node.js...", tags: ["nodejs"], likes: 8, comments: 1 },
  ];

  return (
    <div className="bookmarks-container">
      <h1>Bookmarked Posts</h1>
      {bookmarkedPosts.map((p, idx) => (
        <PostCard key={idx} post={p} />
      ))}
      {bookmarkedPosts.length === 0 && <p>No bookmarks yet.</p>}
    </div>
  );
};

export default BookmarksPage;
