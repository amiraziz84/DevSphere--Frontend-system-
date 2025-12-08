import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";
import { BASE_URL } from "../../services/api";
import "./SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        let url = `${BASE_URL}/search`;

        if (tag) {
          url += `?tag=${tag}`;
        } else if (query) {
          url += `?q=${query}`;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        setPosts(res.data.posts || []);
      } catch (e) {
        console.error("Failed to load posts:", e);
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
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <p className="no-result">No posts found.</p>
      )}
    </div>
  );
};

export default SearchPage;
