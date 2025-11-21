import { useState, useEffect } from "react";
import api from "../../services/api";

type Comment = {
  id: string;
  author: string;
  text: string;
};

interface CommentsFeatureProps {
  postId: string;
}

const CommentsFeature = ({ postId }: CommentsFeatureProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get<Comment[]>(`/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments");
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/comments`, {
        postId,
        text: newComment,
      });

      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment");
    }
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
