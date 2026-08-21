import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const {
        user,
        logout
    } = useAuth();


    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold">
                Welcome, {user?.name}
            </h1>

            <p className="mt-2">
                Role: {user?.role}
            </p>


            <button
                onClick={logout}
                className="mt-6 bg-red-600 text-white px-5 py-3 rounded"
            >
                Logout
            </button>

        </div>

    );
}

export default Dashboard;