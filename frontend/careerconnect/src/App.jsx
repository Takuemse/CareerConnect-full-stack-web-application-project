import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";

// Route protection
import RoleRoute from "./routes/RoleRoute";


function App() {

    return (

        <div>

            <Navbar />

            <Routes>

                {/* HOME */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* PUBLIC */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />


                {/* JOB SEEKER */}

                <Route
                    path="/dashboard"
                    element={
                        <RoleRoute
                            allowedRoles={["JOB_SEEKER"]}
                        >
                            <JobSeekerDashboard />
                        </RoleRoute>
                    }
                />

                <Route
                    path="/applications"
                    element={
                        <RoleRoute
                            allowedRoles={["JOB_SEEKER"]}
                        >
                            <MyApplications />
                        </RoleRoute>
                    }
                />


                {/* RECRUITER */}

                <Route
                    path="/recruiter"
                    element={
                        <RoleRoute
                            allowedRoles={["RECRUITER"]}
                        >
                            <RecruiterDashboard />
                        </RoleRoute>
                    }
                />

                <Route
                    path="/jobs/create"
                    element={
                        <RoleRoute
                            allowedRoles={["RECRUITER"]}
                        >
                            <CreateJob />
                        </RoleRoute>
                    }
                />


                {/* ADMIN */}

                <Route
                    path="/admin"
                    element={
                        <RoleRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <AdminDashboard />
                        </RoleRoute>
                    }
                />

            </Routes>

        </div>
    );
}

export default App;