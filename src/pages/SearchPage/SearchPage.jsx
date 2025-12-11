import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/api";
import PostCard from "../../components/PostCard/PostCard";
import "./SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const query = params.get("q") || "";
  const tag = params.get("tag") || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        // 🔥 API URL build correctly
        const url = `${BASE_URL}/search${
          tag ? `?tag=${encodeURIComponent(tag)}` :
          query ? `?q=${encodeURIComponent(query)}` :
          ""
        }`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        setPosts(response.data.posts || []);
      } catch (error) {
        console.error("Search error:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [query, tag]);

  return (
    <div className="search-page-container">
      <h1>
        {tag
          ? `Posts tagged #${tag}`
          : query
          ? `Search results for “${query}”`
          : "Search"}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post.id || post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="no-result">No posts found.</p>
      )}
    </div>
  );
};

export default SearchPage;
