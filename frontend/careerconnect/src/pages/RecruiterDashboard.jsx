import { useAuth } from "../context/AuthContext";

function RecruiterDashboard() {

    const { user } = useAuth();

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold">
                Recruiter Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
                Welcome, {user?.name}
            </p>


            <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="bg-white border p-6 rounded-lg">
                    <h2 className="font-bold">
                        My Jobs
                    </h2>

                    <p className="text-3xl mt-2">
                        0
                    </p>
                </div>


                <div className="bg-white border p-6 rounded-lg">
                    <h2 className="font-bold">
                        Applications
                    </h2>

                    <p className="text-3xl mt-2">
                        0
                    </p>
                </div>


                <div className="bg-white border p-6 rounded-lg">
                    <h2 className="font-bold">
                        Active Jobs
                    </h2>

                    <p className="text-3xl mt-2">
                        0
                    </p>
                </div>

            </div>

        </div>

    );
}

export default RecruiterDashboard;