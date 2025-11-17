import { useState, ChangeEvent, FormEvent } from "react";
import "./LoginPage.css";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const temp: LoginErrors = {};
    if (!form.email.trim()) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) temp.email = "Invalid email format";

    if (!form.password.trim()) temp.password = "Password is required";
    else if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      console.log("Login Data:", form);
      setLoading(false);
      alert("Logged in successfully!");
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue to DevSphere</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <a href="/signup">Create account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
