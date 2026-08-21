// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\pages\MyApplications.jsx
import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import api from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await api.get("/applications/my");
        const data = response.data;
        setApplications(data.applications || data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4622D]">
          Your progress
        </p>
        <h1 className="mt-4 display-title">My applications</h1>

        {error && <p className="mt-6 error-message">{error}</p>}

        {loading ? (
          <p className="mt-10 flex items-center gap-3 text-[#6B7280]">
            <FiRefreshCw className="animate-spin" /> Loading applications...
          </p>
        ) : applications.length === 0 ? (
          <div className="mt-10 empty-state">
            You have not applied for any jobs yet.
          </div>
        ) : (
          <div className="mt-10 space-y-5">
            {applications.map((application) => (
              <article key={application.id} className="editorial-panel">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h2 className="font-serif text-2xl text-[#14213D]">
                      {application.job?.title || application.jobTitle || "Untitled role"}
                    </h2>
                    <p className="mt-2 text-[#6B7280]">
                      {application.job?.company?.name ||
                        application.companyName ||
                        "Company"}
                    </p>
                  </div>

                  <span className="h-fit w-fit border border-[#6B7A5E] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#6B7A5E]">
                    {application.status || "PENDING"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyApplications;