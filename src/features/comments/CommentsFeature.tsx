import { useState } from "react";
import "./CommentsFeature.css";

type Comment = {
  id: number;
  author: string;
  text: string;
};

interface CommentsFeatureProps {
  postId: number; // explicitly typed
}

const CommentsFeature = ({ postId }: CommentsFeatureProps) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "m_amir", text: "Great post!" },
    { id: 2, author: "dev_hassan", text: "Thanks for sharing." },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        author: "You",
        text: newComment,
      },
    ]);

    setNewComment("");
  };

  return (
    <div className="comments-feature">
      <h3>Comments</h3>

      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-card">
            <strong>@{c.author}</strong>: {c.text}
          </div>
        ))}
      </div>

      <div className="comment-input">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>
    </div>
  );
};

export default CommentsFeature;
