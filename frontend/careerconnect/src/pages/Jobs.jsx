import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Jobs() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {

        const getJobs = async () => {

            try {

                const response = await api.get("/jobs");

                console.log("Jobs:", response.data);

                setJobs(
                    response.data.jobs || response.data
                );

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load jobs."
                );

            } finally {

                setLoading(false);

            }
        };

        getJobs();

    }, []);


    const applyForJob = async (jobId) => {

        setError("");
        setMessage("");

        try {

            const response = await api.post(
                "/applications",
                {
                    job_id: jobId
                }
            );

            console.log(
                "Application submitted:",
                response.data
            );

            setMessage(
                "Application submitted successfully!"
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to submit application."
            );

        }
    };


    if (loading) {

        return (
            <div className="p-8">
                Loading jobs...
            </div>
        );

    }


    return (

        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Find Jobs
                </h1>


                {/* Success */}

                {message && (

                    <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                        {message}
                    </div>

                )}


                {/* Error */}

                {error && (

                    <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                        {error}
                    </div>

                )}


                {/* Jobs */}

                {jobs.length === 0 ? (

                    <div className="bg-white p-8 rounded-lg">
                        <p>
                            No jobs available.
                        </p>
                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {jobs.map((job) => (

                            <div
                                key={job.id}
                                className="bg-white border rounded-lg p-6 shadow-sm"
                            >

                                <h2 className="text-xl font-bold">
                                    {job.title}
                                </h2>


                                <p className="text-gray-600 mt-2">
                                    {job.company_name}
                                </p>


                                <p className="text-gray-500 mt-2">
                                    📍 {job.location}
                                </p>


                                <p className="mt-4 text-gray-700">
                                    {job.description}
                                </p>


                                <div className="mt-4">

                                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                                        {job.job_type}
                                    </span>

                                </div>


                                {/* Apply */}

                                {user?.role === "JOB_SEEKER" && (

                                    <button
                                        onClick={() =>
                                            applyForJob(job.id)
                                        }
                                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                                    >
                                        Apply Now
                                    </button>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}

export default Jobs;