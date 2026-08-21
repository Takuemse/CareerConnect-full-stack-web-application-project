import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/users/login",
                {
                    email,
                    password
                }
            );

            console.log(
                "Login successful:",
                response.data
            );


            // Save user + JWT
            login(
                response.data.user,
                response.data.token
            );


            // Go to dashboard
            navigate("/dashboard");


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
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
                    Login
                </h1>


                {/* ERROR */}

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}


                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full border p-3 mb-4 rounded"
                    required
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full border p-3 mb-4 rounded"
                    required
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded disabled:bg-gray-400"
                >

                    {loading
                        ? "Logging in..."
                        : "Login"
                    }

                </button>

            </form>

        </div>

    );
}

export default Login;