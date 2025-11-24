import { useState, useEffect } from "react";
import api from "../../services/api";
import "./ReactionsFeature.css";

type ReactionType = "LIKE" | "LOVE";

interface ReactionsProps {
  postId?: string;
  commentId?: string;
}

interface ReactionResponse {
  type: ReactionType;
  isUserReaction?: boolean;
}

const reactionIcons: Record<ReactionType, string> = {
  LIKE: "👍",
  LOVE: "❤️",
};

const ReactionsFeature = ({ postId, commentId }: ReactionsProps) => {
  const [reactions, setReactions] = useState<Record<ReactionType, number>>({
    LIKE: 0,
    LOVE: 0,
  });

  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);

  // ===============================
  // LOAD EXISTING REACTIONS
  // ===============================
  useEffect(() => {
    const fetchReactions = async () => {
      if (!postId && !commentId) return;

      try {
        const res = await api.get(
          postId
            ? `/reactions/post/${postId}`
            : `/reactions/comment/${commentId}`
        );

        const counts: Record<ReactionType, number> = {
          LIKE: 0,
          LOVE: 0,
      
        };

        res.data.forEach((r: ReactionResponse) => {
          counts[r.type]++;
          if (r.isUserReaction) setUserReaction(r.type);
        });

        setReactions(counts);
      } catch (err) {
        console.log("Failed to load reactions", err);
      }
    };

    fetchReactions();
  }, [postId, commentId]);

  // ===============================
  // TOGGLE REACTION
  // ===============================
  const handleReact = async (type: ReactionType) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return alert("Please login first");
    if (!postId && !commentId) return;

    try {
      await api.post(
        "/reactions/toggle",
        {
          postId,
          commentId,
          type: type.toUpperCase(), // 🔑 convert to Prisma enum format
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Reaction failed");
    }
  };

  return (
    <div className="reactions-container">
      {(Object.keys(reactionIcons) as ReactionType[]).map((type) => (
        <button
          key={type}
          className={`reaction-btn ${userReaction === type ? "active" : ""}`}
          onClick={() => handleReact(type)}
        >
          {reactionIcons[type]} {reactions[type]}
        </button>
      ))}
    </div>
  );
};

export default ReactionsFeature;
