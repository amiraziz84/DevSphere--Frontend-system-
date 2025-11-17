import { create } from "zustand";

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
}

interface PostsStore {
  posts: Post[];
  addPost: (title: string, content: string, author: string) => void;
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],

  addPost: (title, content, author) =>
    set((state) => ({
      posts: [
        ...state.posts,
        {
          id: Date.now(),
          title,
          content,
          author,
        },
      ],
    })),
}));
