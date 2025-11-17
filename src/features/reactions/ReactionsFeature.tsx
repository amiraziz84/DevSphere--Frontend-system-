import { useState } from "react";
import "./ReactionsFeature.css";

type ReactionType = "like" | "love" | "laugh" | "sad";

interface ReactionsProps {
  postId: string;
  initialReactions?: {
    [key in ReactionType]?: number;
  };
}

const ReactionsFeature = ({ postId, initialReactions = {} }: ReactionsProps) => {
  const [reactions, setReactions] = useState<{
    [key in ReactionType]: number;
  }>({
    like: initialReactions.like || 0,
    love: initialReactions.love || 0,
    laugh: initialReactions.laugh || 0,
    sad: initialReactions.sad || 0,
  });

  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);

  const handleReact = (type: ReactionType) => {
    setReactions((prev) => {
      const updated = { ...prev };
      if (userReaction === type) {
        updated[type] -= 1;
        setUserReaction(null);
      } else {
        if (userReaction) updated[userReaction] -= 1;
        updated[type] += 1;
        setUserReaction(type);
      }
      return updated;
    });
  };

  return (
    <div className="reactions-container">
      {(["like", "love", "laugh", "sad"] as ReactionType[]).map((type) => (
        <button
          key={type}
          className={`reaction-btn ${userReaction === type ? "active" : ""}`}
          onClick={() => handleReact(type)}
        >
          {type === "like" ? "👍" : type === "love" ? "❤️" : type === "laugh" ? "😂" : "😢"} {reactions[type]}
        </button>
      ))}
    </div>
  );
};

export default ReactionsFeature;
