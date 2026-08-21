import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="bg-blue-600 text-white p-4">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    CareerConnect
                </Link>


                <div className="flex gap-6">

                    <Link to="/jobs">
                        Find Jobs
                    </Link>

                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;