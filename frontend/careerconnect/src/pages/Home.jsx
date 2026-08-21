import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}

            <section className="py-20 text-center px-6">

                <h1 className="text-5xl font-bold mb-6">
                    Find Your Next Opportunity
                </h1>

                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                    CareerConnect connects talented
                    job seekers with great companies.
                    Find jobs, apply with ease, and take
                    the next step in your career.
                </p>


                {/* Buttons */}

                <div className="flex justify-center gap-4">

                    <Link
                        to="/jobs"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Find Jobs
                    </Link>


                    <Link
                        to="/jobs/create"
                        className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
                    >
                        Post a Job
                    </Link>

                </div>

            </section>


            {/* Features Section */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="grid md:grid-cols-3 gap-6">


                    {/* Job Seekers */}

                    <div className="bg-white p-6 rounded-lg shadow-sm">

                        <h2 className="text-xl font-bold mb-3">
                            Find Jobs
                        </h2>

                        <p className="text-gray-600">
                            Discover job opportunities that
                            match your skills, experience and
                            career goals.
                        </p>

                    </div>


                    {/* Recruiters */}

                    <div className="bg-white p-6 rounded-lg shadow-sm">

                        <h2 className="text-xl font-bold mb-3">
                            Hire Talent
                        </h2>

                        <p className="text-gray-600">
                            Recruiters can post jobs and find
                            talented candidates for their
                            companies.
                        </p>

                    </div>


                    {/* Applications */}

                    <div className="bg-white p-6 rounded-lg shadow-sm">

                        <h2 className="text-xl font-bold mb-3">
                            Track Applications
                        </h2>

                        <p className="text-gray-600">
                            Apply for jobs and keep track of
                            your application status from one
                            place.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Home;