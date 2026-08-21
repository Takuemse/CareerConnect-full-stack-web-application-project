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

      setSuccess("Account created successfully. Redirecting to login...");

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
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-12">
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C4622D]">
            CareerConnect
          </p>

          <h1 className="font-serif text-5xl leading-tight text-[#14213D] md:text-6xl">
            Build your next career connection.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#6B7280]">
            Join a professional community where ambitious people and
            meaningful opportunities meet.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-l-4 border-[#C4622D] bg-white p-8 shadow-sm md:p-10"
        >
          <div className="mb-8 flex items-center gap-3">
            <FiUserPlus className="text-2xl text-[#C4622D]" />
            <h2 className="font-serif text-3xl text-[#14213D]">
              Create your account
            </h2>
          </div>

          {success && (
            <p className="mb-5 border-l-4 border-[#6B7A5E] bg-green-50 p-3 text-[#6B7A5E]">
              {success}
            </p>
          )}

          {error && (
            <p className="mb-5 border-l-4 border-red-600 bg-red-50 p-3 text-red-700">
              {error}
            </p>
          )}

          <label className="mb-2 block text-sm font-medium text-[#14213D]">
            Full name
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full border border-gray-300 bg-[#FAF7F2] p-3 outline-none transition focus:border-[#C4622D]"
            required
          />

          <label className="mb-2 mt-5 block text-sm font-medium text-[#14213D]">
            Email address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-300 bg-[#FAF7F2] p-3 outline-none transition focus:border-[#C4622D]"
            required
          />

          <label className="mb-2 mt-5 block text-sm font-medium text-[#14213D]">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            minLength={8}
            className="w-full border border-gray-300 bg-[#FAF7F2] p-3 outline-none transition focus:border-[#C4622D]"
            required
          />

          <label className="mb-2 mt-5 block text-sm font-medium text-[#14213D]">
            Account type
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-[#FAF7F2] p-3 outline-none focus:border-[#C4622D]"
          >
            <option value="JOB_SEEKER">Job seeker</option>
            <option value="RECRUITER">Recruiter</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 bg-[#C4622D] p-3 font-medium text-white transition hover:bg-[#A94F25] disabled:cursor-not-allowed disabled:opacity-50"
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