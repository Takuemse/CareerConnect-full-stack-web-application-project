import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateJob() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        job_type: "FULL_TIME"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await api.post(
                "/jobs",
                formData
            );

            navigate("/jobs");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to create job"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="max-w-2xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Post a Job
            </h1>

            {error && (
                <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </p>
            )}


            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    name="title"
                    placeholder="Job title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Job description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    rows="6"
                    required
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    name="salary"
                    type="number"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >

                    <option value="FULL_TIME">
                        Full Time
                    </option>

                    <option value="PART_TIME">
                        Part Time
                    </option>

                    <option value="CONTRACT">
                        Contract
                    </option>

                    <option value="INTERNSHIP">
                        Internship
                    </option>

                </select>


                <button
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >

                    {loading
                        ? "Posting..."
                        : "Post Job"
                    }

                </button>

            </form>

        </div>

    );
}

export default CreateJob;