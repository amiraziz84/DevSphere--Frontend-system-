import { useState } from "react";
import "./CommentBox.css";

interface CommentBoxProps {
  postId: number;
}

const CommentBox = ({ postId }: CommentBoxProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    console.log("Comment added on post:", postId, comment);
    setComment("");
  };

  return (
    <div className="comment-box">
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default CommentBox;
