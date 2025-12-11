import { useState, useEffect } from "react";
import api from "../../services/api";
import "./ReactionsFeature.css";

const reactionIcons = {
  LIKE: "👍",
  LOVE: "❤️",
};

const ReactionsFeature = ({ postId, commentId }) => {
  const [reactions, setReactions] = useState({
    LIKE: 0,
    LOVE: 0,
  });

  const [userReaction, setUserReaction] = useState(null);

  // Logged-in user ID
  const userId = localStorage.getItem("user_id");

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

        // Count reactions
        const counts = { LIKE: 0, LOVE: 0 };

        res.data.forEach((r) => {
          counts[r.type]++;

          // Detect user's own reaction
          if (userId && r.user?.id === userId) {
            setUserReaction(r.type);
          }
        });

        setReactions(counts);
      } catch (err) {
        console.log("Failed to load reactions", err);
      }
    };

    fetchReactions();
  }, [postId, commentId, userId]);

  // ===============================
  // TOGGLE REACTION
  // ===============================
  const handleReact = async (type) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return alert("Please login first");
    if (!postId && !commentId) return;

    try {
      await api.post(
        "/reactions/toggle",
        {
          postId,
          commentId,
          type: type.toUpperCase(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update UI instantly
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
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Reaction failed");
    }
  };

  return (
    <div className="reactions-container">
      {Object.keys(reactionIcons).map((type) => (
        <button
          key={type}
          className={`reaction-btn ${
            userReaction === type ? "active" : ""
          }`}
          onClick={() => handleReact(type)}
        >
          {reactionIcons[type]} {reactions[type]}
        </button>
      ))}
    </div>
  );
};

export default ReactionsFeature;
