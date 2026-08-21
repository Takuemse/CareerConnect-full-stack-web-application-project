import { useEffect, useState } from "react";
import api from "../services/api";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const getApplications = async () => {

            try {

                const response =
                    await api.get("/applications/my");

                setApplications(
                    response.data.applications ||
                    response.data
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load applications."
                );

            } finally {

                setLoading(false);

            }
        };

        getApplications();

    }, []);


    if (loading) {

        return (
            <div className="p-8">
                Loading applications...
            </div>
        );

    }


    return (

        <div className="min-h-screen bg-gray-100">

            <div className="max-w-5xl mx-auto p-8">

                <h1 className="text-3xl font-bold mb-8">
                    My Applications
                </h1>


                {error && (

                    <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                        {error}
                    </div>

                )}


                {applications.length === 0 ? (

                    <div className="bg-white p-8 rounded-lg">
                        <p>
                            You haven't applied for any jobs yet.
                        </p>
                    </div>

                ) : (

                    <div className="space-y-4">

                        {applications.map(
                            (application) => (

                            <div
                                key={application.id}
                                className="bg-white p-6 rounded-lg shadow"
                            >

                                <h2 className="text-xl font-bold">
                                    {application.job_title}
                                </h2>


                                <p className="text-gray-600 mt-2">
                                    {application.company_name}
                                </p>


                                <p className="mt-3">
                                    Status:
                                    <span className="ml-2 font-semibold">
                                        {application.status}
                                    </span>
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}

export default MyApplications;