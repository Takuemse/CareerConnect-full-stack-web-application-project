function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            <section className="py-20 text-center">

                <h1 className="text-5xl font-bold mb-6">
                    Find Your Next Opportunity
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                    CareerConnect connects talented
                    job seekers with great companies.
                </p>

                <div className="flex justify-center gap-4">

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Find Jobs
                    </button>

                    <button className="border border-gray-300 px-6 py-3 rounded-lg">
                        Post a Job
                    </button>

                </div>

            </section>

        </div>
    );
}

export default Home;