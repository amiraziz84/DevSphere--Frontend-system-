import { useState } from "react";
import "./PostsFeature.css";
import ReactionButton from "../../components/ReactionButton/ReactionButton";
import CommentBox from "../../components/CommentBox/CommentBox";

const PostsFeature = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "First Post", content: "Hello world!" },
    { id: 2, title: "Second Post", content: "React is awesome." },
  ]);

  return (
    <div className="posts-feature">
      <h3>Posts</h3>

      {posts.map((p) => (
        <div key={p.id} className="post-card">
          <h4>{p.title}</h4>
          <p>{p.content}</p>

          {/* Reaction Buttons */}
          <div className="post-actions">
            <ReactionButton postId={p.id} />
          </div>

          {/* Comment Box */}
          <div className="post-comments">
            <CommentBox postId={p.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsFeature;
