import { useState } from "react";
import "./ReactionButton.css";

interface ReactionButtonProps {
  postId: number | string; // backend kabhi string ID bhi bhej sakta
  initialLikes?: number;   // optional initial likes support
}

const ReactionButton = ({ postId, initialLikes = 0 }: ReactionButtonProps) => {
  const [likes, setLikes] = useState<number>(initialLikes);

  const handleLike = () => {
    setLikes((prev) => prev + 1);

    // 🔹 Future API Call (commented for now)
    // await api.post(`/posts/${postId}/react`, { type: "like" });
  };

  return (
    <button className="reaction-button" onClick={handleLike}>
      👍 {likes}
    </button>
  );
};

export default ReactionButton;
