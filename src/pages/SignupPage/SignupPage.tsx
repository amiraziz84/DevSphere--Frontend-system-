// src/pages/SignupPage/SignupPage.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import api from "../../services/api";
import "./SignupPage.css";
import { useAuthStore } from "../../store/auth.store";

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const [form, setForm] = useState<SignupForm>({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const loginStore = useAuthStore((s) => s.login);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const temp: any = {};
    if (!form.username.trim()) temp.username = "Username is required";
    if (!form.email.trim()) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) temp.email = "Invalid email";
    if (!form.password.trim()) temp.password = "Password is required";
    else if (form.password.length < 6) temp.password = "Password must be at least 6 characters";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      // Replace with your real endpoint /auth/signup
      const res = await api.post("/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // expected response shape: { user: {...}, token: "..." }
      const { user, token } = res.data as { user: any; token: string };

      localStorage.setItem("token", token);
      loginStore(user, token);

      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      setErrors({ general: err?.response?.data?.message || "Signup failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account 🚀</h2>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} className={errors.username ? "input-error" : ""} />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={errors.email ? "input-error" : ""} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className={errors.password ? "input-error" : ""} />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {errors.general && <div className="error-text">{errors.general}</div>}

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
