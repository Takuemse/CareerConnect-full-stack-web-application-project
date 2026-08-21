import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function JobSeekerDashboard() {

    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto p-8">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        Job Seeker Dashboard
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Welcome back, {user?.name}
                    </p>

                </div>


                <div className="grid md:grid-cols-3 gap-6">

                    {/* Find Jobs */}

                    <Link
                        to="/jobs"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                    >

                        <h2 className="text-xl font-bold mb-2">
                            Find Jobs
                        </h2>

                        <p className="text-gray-600">
                            Browse available job opportunities.
                        </p>

                    </Link>


                    {/* Applications */}

                    <Link
                        to="/applications"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                    >

                        <h2 className="text-xl font-bold mb-2">
                            My Applications
                        </h2>

                        <p className="text-gray-600">
                            Track the jobs you have applied for.
                        </p>

                    </Link>


                    {/* Profile */}

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-xl font-bold mb-2">
                            My Profile
                        </h2>

                        <p className="text-gray-600">
                            Manage your personal information and skills.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default JobSeekerDashboard;