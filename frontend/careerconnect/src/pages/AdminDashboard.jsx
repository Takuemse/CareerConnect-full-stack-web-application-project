import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {

    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto p-8">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Welcome, {user?.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        System administration and monitoring
                    </p>

                </div>


                {/* Statistics */}

                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-lg shadow">

                        <p className="text-gray-500">
                            Users
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            Manage
                        </h2>

                    </div>


                    <div className="bg-white p-6 rounded-lg shadow">

                        <p className="text-gray-500">
                            Jobs
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            Manage
                        </h2>

                    </div>


                    <div className="bg-white p-6 rounded-lg shadow">

                        <p className="text-gray-500">
                            Applications
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            Monitor
                        </h2>

                    </div>

                </div>


                {/* Admin Actions */}

                <div className="grid md:grid-cols-2 gap-6">

                    <Link
                        to="/admin/users"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md"
                    >

                        <h2 className="text-xl font-bold mb-2">
                            Manage Users
                        </h2>

                        <p className="text-gray-600">
                            View and manage CareerConnect users.
                        </p>

                    </Link>


                    <Link
                        to="/jobs"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md"
                    >

                        <h2 className="text-xl font-bold mb-2">
                            Manage Jobs
                        </h2>

                        <p className="text-gray-600">
                            View job listings on the platform.
                        </p>

                    </Link>


                    <Link
                        to="/admin/applications"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md"
                    >

                        <h2 className="text-xl font-bold mb-2">
                            Applications
                        </h2>

                        <p className="text-gray-600">
                            Monitor job applications.
                        </p>

                    </Link>


                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-xl font-bold mb-2">
                            System Status
                        </h2>

                        <p className="text-green-600 font-medium">
                            ● System Operational
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;