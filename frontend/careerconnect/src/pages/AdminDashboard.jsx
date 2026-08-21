// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\pages\AdminDashboard.jsx
import { FiBriefcase, FiFileText, FiShield, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  const actions = [
    [FiUsers, "Manage users", "Review platform accounts.", "/admin/users"],
    [FiBriefcase, "Manage jobs", "Review published job listings.", "/jobs"],
    [FiFileText, "Applications", "Monitor submitted applications.", "/admin/applications"],
  ];

  return (
    <main className="page-shell">
      <section className="page-container">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4622D]">
          Administration
        </p>
        <h1 className="mt-4 display-title">System overview</h1>
        <p className="mt-5 text-lg text-[#6B7280]">
          Welcome, {user?.name}. Manage CareerConnect from one workspace.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Users", "Manage"],
            ["Jobs", "Review"],
            ["Applications", "Monitor"],
          ].map(([label, value]) => (
            <div key={label} className="bg-white p-6 shadow-sm">
              <p className="text-[#6B7280]">{label}</p>
              <p className="mt-3 font-serif text-3xl text-[#14213D]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {actions.map(([Icon, title, text, to]) => (
            <Link key={title} to={to} className="editorial-panel">
              <Icon className="text-2xl text-[#C4622D]" />
              <h2 className="mt-5 font-serif text-2xl text-[#14213D]">{title}</h2>
              <p className="mt-3 text-[#6B7280]">{text}</p>
            </Link>
          ))}

          <div className="bg-white p-6 shadow-sm">
            <FiShield className="text-2xl text-[#6B7A5E]" />
            <h2 className="mt-5 font-serif text-2xl text-[#14213D]">
              System status
            </h2>
            <p className="mt-3 text-[#6B7A5E]">All services operational</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;