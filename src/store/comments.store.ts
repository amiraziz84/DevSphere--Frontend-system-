import { create } from "zustand";

interface Comment {
  id: number;
  postId: number;
  author: string;
  text: string;
}

interface CommentStore {
  comments: Comment[];
  addComment: (postId: number, text: string, author: string) => void;
}

export const useCommentsStore = create<CommentStore>((set) => ({
  comments: [],

  addComment: (postId, text, author) =>
    set((state) => ({
      comments: [
        ...state.comments,
        { id: Date.now(), postId, text, author },
      ],
    })),
}));
