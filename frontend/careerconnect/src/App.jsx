// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />

        <Route
          path="/dashboard"
          element={
            <RoleRoute allowedRoles={["JOB_SEEKER"]}>
              <JobSeekerDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <RoleRoute allowedRoles={["JOB_SEEKER"]}>
              <MyApplications />
            </RoleRoute>
          }
        />

        <Route
          path="/recruiter"
          element={
            <RoleRoute allowedRoles={["RECRUITER"]}>
              <RecruiterDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/jobs/create"
          element={
            <RoleRoute allowedRoles={["RECRUITER"]}>
              <CreateJob />
            </RoleRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;