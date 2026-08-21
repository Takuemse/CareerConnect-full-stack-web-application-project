// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\routes\RoleRoute.jsx
import { Navigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ children, allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <main className="page-shell">
        <div className="page-container flex items-center gap-3 text-[#6B7280]">
          <FiRefreshCw className="animate-spin" /> Restoring your session...
        </div>
      </main>
    );
  }

  if (!token) return <Navigate to="/login" replace />;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;