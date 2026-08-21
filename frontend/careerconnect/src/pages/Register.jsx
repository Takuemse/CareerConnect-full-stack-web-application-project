import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "JOB_SEEKER"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const response = await api.post(
                "/users/register",
                formData
            );

            console.log(
                "Registered successfully:",
                response.data
            );

            setSuccess(
                "Account created successfully! Redirecting to login..."
            );

            // Wait 1.5 seconds so user can see success message
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Create Account
                </h1>


                {/* SUCCESS MESSAGE */}

                {success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {success}
                    </div>
                )}


                {/* ERROR MESSAGE */}

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}


                <input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />


                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />


                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                >

                    <option value="JOB_SEEKER">
                        Job Seeker
                    </option>

                    <option value="RECRUITER">
                        Recruiter
                    </option>

                </select>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded disabled:bg-gray-400"
                >

                    {loading
                        ? "Creating Account..."
                        : "Register"
                    }

                </button>

            </form>

        </div>

    );
}

export default Register;