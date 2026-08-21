// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\components\Navbar.jsx
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const dashboardPath =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "RECRUITER"
        ? "/recruiter"
        : "/dashboard";

  return (
    <nav className="border-b border-[#E5E0D8] bg-[#FAF7F2]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-serif text-2xl font-semibold text-[#14213D]">
          Career<span className="text-[#C4622D]">Connect</span>
        </Link>

        <button
          className="text-2xl text-[#14213D] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-[73px] z-10 flex-col gap-4 border-b bg-[#FAF7F2] p-6 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          <Link className="text-[#14213D] hover:text-[#C4622D]" to="/jobs">
            Find jobs
          </Link>

          {user && (
            <Link className="text-[#14213D] hover:text-[#C4622D]" to={dashboardPath}>
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link className="text-[#14213D] hover:text-[#C4622D]" to="/login">
                Sign in
              </Link>
              <Link className="primary-button" to="/register">
                Create account
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-[#C4622D]"
            >
              <FiLogOut /> Sign out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;