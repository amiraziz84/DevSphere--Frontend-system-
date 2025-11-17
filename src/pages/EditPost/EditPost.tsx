import { useState, ChangeEvent, FormEvent } from "react";
import "./EditPost.css";

interface PostForm {
  title: string;
  content: string;
  tags: string;
  banner?: File | null;
}

interface PostErrors {
  title?: string;
  content?: string;
}

const EditPost = () => {
  // Mock existing post data
  const [form, setForm] = useState<PostForm>({
    title: "Existing Post Title",
    content: "This is the existing content of the post...",
    tags: "react, nodejs",
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
      console.log("Updated Post Data:", form);
      setLoading(false);
      alert("Post updated successfully!");
    }, 1000);
  };

  return (
    <div className="edit-post-container">
      <h1 className="page-title">Edit Post</h1>
      <form className="edit-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Post Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Change Banner (optional)</label>
          <input type="file" name="banner" accept="image/*" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            rows={10}
            value={form.content}
            onChange={handleChange}
            required
            className={errors.content ? "input-error" : ""}
          ></textarea>
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input type="text" name="tags" value={form.tags} onChange={handleChange} />
        </div>

        <button type="submit" className="update-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
