// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\pages\JobSeekerDashboard.jsx
import { FiArrowRight, FiBriefcase, FiFileText, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function JobSeekerDashboard() {
  const { user } = useAuth();

  const actions = [
    [FiBriefcase, "Find jobs", "Browse and filter current opportunities.", "/jobs"],
    [FiFileText, "Applications", "Track your submitted applications.", "/applications"],
    [FiUser, "Profile", "Keep your professional details current.", "/profile"],
  ];

  return (
    <main className="page-shell">
      <section className="page-container">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4622D]">
          Job seeker workspace
        </p>
        <h1 className="mt-4 display-title">Welcome back, {user?.name}.</h1>
        <p className="mt-5 text-lg text-[#6B7280]">
          Your next opportunity may be closer than you think.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {actions.map(([Icon, title, text, to]) => (
            <Link key={title} to={to} className="editorial-panel group">
              <Icon className="text-2xl text-[#C4622D]" />
              <h2 className="mt-5 font-serif text-2xl text-[#14213D]">{title}</h2>
              <p className="mt-3 text-[#6B7280]">{text}</p>
              <span className="mt-6 flex items-center gap-2 text-sm text-[#C4622D]">
                Open <FiArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default JobSeekerDashboard;