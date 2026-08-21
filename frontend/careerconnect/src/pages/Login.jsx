import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);
      const data = response.data;
      const loggedInUser = data.user || data;
      const jwt = data.token;

      login(loggedInUser, jwt);

      if (loggedInUser.role === "ADMIN") navigate("/admin");
      else if (loggedInUser.role === "RECRUITER") navigate("/recruiter");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-8 shadow-sm">
        <FiLogIn className="text-3xl text-[#C4622D] mb-4" />
        <h1 className="text-4xl font-serif text-[#14213D]">Welcome back</h1>

        {error && <p className="mt-4 bg-red-50 p-3 text-red-700">{error}</p>}

        <input
          className="mt-6 w-full border p-3"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="mt-4 w-full border p-3"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          disabled={loading}
          className="mt-6 w-full bg-[#C4622D] p-3 text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-5 text-sm text-[#6B7280]">
          Do not have an account?{" "}
          <Link className="text-[#C4622D]" to="/register">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;