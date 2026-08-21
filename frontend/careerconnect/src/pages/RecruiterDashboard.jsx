// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\pages\RecruiterDashboard.jsx
import { useEffect, useState } from "react";
import { FiBriefcase, FiPlus, FiRefreshCw, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await api.get("/jobs/mine");
        setJobs(response.data.jobs || response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load your jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const applicationCount = jobs.reduce(
    (total, job) => total + (job._count?.applications || 0),
    0
  );

  return (
    <main className="page-shell">
      <section className="page-container">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4622D]">
          Recruiter workspace
        </p>
        <h1 className="mt-4 display-title">Welcome back, {user?.name}.</h1>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="bg-white p-6 shadow-sm">
            <FiBriefcase className="text-2xl text-[#C4622D]" />
            <p className="mt-5 text-[#6B7280]">Published roles</p>
            <p className="mt-2 font-serif text-4xl text-[#14213D]">
              {loading ? "—" : jobs.length}
            </p>
          </div>

          <div className="bg-white p-6 shadow-sm">
            <FiUsers className="text-2xl text-[#C4622D]" />
            <p className="mt-5 text-[#6B7280]">Applications received</p>
            <p className="mt-2 font-serif text-4xl text-[#14213D]">
              {loading ? "—" : applicationCount}
            </p>
          </div>

          <Link to="/jobs/create" className="primary-button min-h-[150px] flex-col">
            <FiPlus className="text-2xl" />
            Post a new role
          </Link>
        </div>

        {error && <p className="mt-6 error-message">{error}</p>}

        <div className="mt-10">
          <h2 className="section-title">Your roles</h2>

          {loading ? (
            <p className="mt-6 flex items-center gap-3 text-[#6B7280]">
              <FiRefreshCw className="animate-spin" /> Loading roles...
            </p>
          ) : jobs.length === 0 ? (
            <div className="mt-6 empty-state">
              You have not posted any roles yet.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {jobs.map((job) => (
                <article key={job.id} className="editorial-panel">
                  <h3 className="font-serif text-2xl text-[#14213D]">{job.title}</h3>
                  <p className="mt-2 text-[#6B7280]">
                    {job.location} · {job.jobType}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default RecruiterDashboard;