import { useState, ChangeEvent, FormEvent } from "react";
import "./CreatePost.css";

interface PostForm {
  title: string;
  content: string;
  tags: string;
  banner: File | null;
}

interface PostErrors {
  title?: string;
  content?: string;
}

const CreatePost = () => {
  const [form, setForm] = useState<PostForm>({
    title: "",
    content: "",
    tags: "",
    banner: null,
  });
  const [errors, setErrors] = useState<PostErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "banner") {
      setForm({ ...form, banner: files ? files[0] : null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const temp: PostErrors = {};
    if (!form.title.trim()) temp.title = "Title is required";
    if (!form.content.trim()) temp.content = "Content is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      console.log("Post Data:", form);
      setLoading(false);
      alert("Post created successfully!");
      setForm({ title: "", content: "", tags: "", banner: null });
    }, 1000);
  };

  return (
    <div className="create-post-container">
      <h1>Create New Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Banner (optional)</label>
          <input type="file" name="banner" accept="image/*" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            rows={8}
            value={form.content}
            onChange={handleChange}
            className={errors.content ? "input-error" : ""}
          ></textarea>
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" name="tags" value={form.tags} onChange={handleChange} />
        </div>

        <button type="submit" className="create-post-btn" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
