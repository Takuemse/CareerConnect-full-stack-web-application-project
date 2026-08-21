import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="bg-white border-b">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    CareerConnect
                </Link>


                <div className="flex gap-6">

                    <Link to="/">
                        Home
                    </Link>
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