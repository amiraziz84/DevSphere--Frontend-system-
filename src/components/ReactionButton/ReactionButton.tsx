import { useState } from "react";
import "./ReactionButton.css";

interface ReactionButtonProps {
  postId: number;
}

const ReactionButton = ({ postId }: ReactionButtonProps) => {
  const [likes, setLikes] = useState(0);

  return (
    <button className="reaction-button" onClick={() => setLikes(likes + 1)}>
      👍 {likes}
    </button>
  );
};

export default ReactionButton;
