// filepath: c:\Users\Takudzwa W Musemwa\Desktop\career-connect\frontend\careerconnect\src\pages\Home.jsx
import { FiArrowRight, FiBriefcase, FiCheckCircle, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page-shell">
      <section className="page-container grid items-center gap-12 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#C4622D]">
            Work, connected
          </p>

          <h1 className="display-title">
            Find work that moves you forward.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#6B7280]">
            CareerConnect brings ambitious people and meaningful opportunities
            together in one focused professional community.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jobs" className="primary-button">
              Explore opportunities <FiArrowRight />
            </Link>
            <Link to="/register" className="dark-button">
              Join CareerConnect
            </Link>
          </div>
        </div>

        <div className="editorial-panel">
          <p className="text-sm uppercase tracking-widest text-[#C4622D]">
            The connection
          </p>
          <h2 className="mt-5 font-serif text-4xl text-[#14213D]">
            Better matches begin with better conversations.
          </h2>
          <p className="mt-5 leading-7 text-[#6B7280]">
            Discover roles, meet growing companies, and keep every application
            organised from first contact to final decision.
          </p>
        </div>
      </section>

      <section className="page-container grid gap-5 pb-12 md:grid-cols-3">
        {[
          [FiBriefcase, "Find roles", "Search opportunities aligned with your goals."],
          [FiUsers, "Meet companies", "Connect with teams looking for your perspective."],
          [FiCheckCircle, "Track progress", "Follow applications through every stage."],
        ].map(([Icon, title, text]) => (
          <article key={title} className="bg-white p-6 shadow-sm">
            <Icon className="text-2xl text-[#C4622D]" />
            <h2 className="mt-5 font-serif text-2xl text-[#14213D]">{title}</h2>
            <p className="mt-3 text-[#6B7280]">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Home;