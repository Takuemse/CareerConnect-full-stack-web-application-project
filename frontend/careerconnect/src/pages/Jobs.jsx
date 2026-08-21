import { useEffect, useState } from "react";
import api from "../services/api";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const getJobs = async () => {

            try {

                const response =
                    await api.get("/jobs");

                setJobs(response.data.jobs);

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


    if (loading) {
        return (
            <p className="p-8">
                Loading jobs...
            </p>
        );
    }


    if (error) {
        return (
            <p className="p-8 text-red-600">
                {error}
            </p>
        );
    }


    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Find Jobs
            </h1>


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
                            {job.location}
                        </p>

                        <p className="mt-4">
                            {job.description}
                        </p>

                        <div className="mt-4">

                            <span className="bg-gray-100 px-3 py-1 rounded">
                                {job.job_type}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Jobs;