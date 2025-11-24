import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
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
const navigate = useNavigate();

const [form, setForm] = useState<PostForm>({
title: "",
content: "",
tags: "",
banner: null,
});

const [errors, setErrors] = useState<PostErrors>({});
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

const handleChange = (
e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
const target = e.target;

if (target.name === "banner" && target instanceof HTMLInputElement) {
  setForm((prev) => ({ ...prev, banner: target.files?.[0] || null }));
  return;
}

setForm((prev) => ({ ...prev, [target.name]: target.value }));

};

const validate = () => {
const temp: PostErrors = {};
if (!form.title.trim()) temp.title = "Title is required";
if (!form.content.trim()) temp.content = "Content is required";
setErrors(temp);
return Object.keys(temp).length === 0;
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();

const token = localStorage.getItem("auth_token");
if (!token) {
  alert("You must be logged in to create a post.");
  return;
}

if (!validate()) return;

setLoading(true);

try {
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("content", form.content);
  formData.append("tags", form.tags);
  if (form.banner) formData.append("banner", form.banner);

  await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  // Show Popup
  setSuccess(true);

  // Reset form
  setForm({ title: "", content: "", tags: "", banner: null });
  setErrors({});
} catch (err: any) {
  alert(err.response?.data?.message || "Failed to create post.");
} finally {
  setLoading(false);
}


};

return ( <div className="create-post-container">
{success && ( <div className="post-success-modal"> <div className="post-success-card"> <h2>🎉 Post Published</h2> <p>Your post is now live!</p>
<button
onClick={() => {
setSuccess(false);
navigate("/");
}}
>
OK </button> </div> </div>
)}


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
      {errors.content && (
        <span className="error-text">{errors.content}</span>
      )}
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
