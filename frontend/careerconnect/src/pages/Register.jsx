import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", formData);

      setSuccess("Account created successfully. Redirecting to sign in...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-container grid min-h-[calc(100vh-10rem)] items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#C4622D]">
            CareerConnect
          </p>

          <h1 className="display-title">
            Start your next career connection.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#6B7280]">
            Create a focused professional profile and discover opportunities
            that match where you want to go.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="editorial-panel p-8 md:p-10"
        >
          <div className="mb-8 flex items-center gap-3">
            <FiUserPlus className="text-2xl text-[#C4622D]" />
            <h2 className="section-title">Create your account</h2>
          </div>

          {success && <p className="success-message mb-5">{success}</p>}
          {error && <p className="error-message mb-5">{error}</p>}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#14213D]"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="field"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#14213D]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="field"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#14213D]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="field"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-[#14213D]"
              >
                Account type
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="field"
              >
                <option value="JOB_SEEKER">Job seeker</option>
                <option value="RECRUITER">Recruiter</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-button mt-7 w-full"
          >
            <FiUserPlus />
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-6 text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#C4622D]">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;