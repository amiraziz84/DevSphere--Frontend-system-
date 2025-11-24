import { useState, useEffect } from "react";
import api from "../../services/api";


interface Post {
  id: string; // ya number agar backend me number hai
  title: string;
  content: string;
  tags?: string[]; // optional
}

const PostsFeature = () => {
  const [posts, setPosts] = useState<Post[]>([]); // type fix
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await api.get<Post[]>("/posts"); // type hint
        setPosts(res.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsFeature;
